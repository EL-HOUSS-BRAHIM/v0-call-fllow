"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Phone, AlertCircle, Loader2, ShieldAlert, Clock, Ban } from "lucide-react"
import type { AgentInfo, AgentType } from "@/app/page"
import { createClient } from "@/lib/supabase/client"

interface AgentSetupProps {
  onComplete: (info: AgentInfo) => void
}

const MAX_ATTEMPTS_PER_AGENT = 5
const MAX_ATTEMPTS_PER_IP = 10
const LOCKOUT_DURATION_MINUTES = 15
const RATE_LIMIT_WINDOW_MINUTES = 30

export function AgentSetup({ onComplete }: AgentSetupProps) {
  const [step, setStep] = useState<"agentId" | "type">("agentId")
  const [agentId, setAgentId] = useState("")
  const [agentName, setAgentName] = useState("")
  const [agentType, setAgentType] = useState<AgentType>("wireless")
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState("")
  const [errorType, setErrorType] = useState<"warning" | "error" | "locked">("warning")
  const [localAttempts, setLocalAttempts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0)
  const [ipRateLimited, setIpRateLimited] = useState(false)

  useEffect(() => {
    checkRateLimiting()
    const interval = setInterval(() => {
      if (lockTimeRemaining > 0) {
        setLockTimeRemaining((prev) => Math.max(0, prev - 1))
        if (lockTimeRemaining <= 1) {
          setIsLocked(false)
          setIpRateLimited(false)
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [lockTimeRemaining])

  const checkRateLimiting = async () => {
    try {
      const supabase = createClient()
      const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString()

      // Check IP-based rate limiting
      const { count: ipAttempts } = await supabase
        .from("login_attempts")
        .select("*", { count: "exact", head: true })
        .gte("created_at", windowStart)
        .eq("success", false)

      if (ipAttempts && ipAttempts >= MAX_ATTEMPTS_PER_IP) {
        setIpRateLimited(true)
        setIsLocked(true)
        setLockTimeRemaining(LOCKOUT_DURATION_MINUTES * 60)
        setError("Too many failed login attempts. Please try again later.")
        setErrorType("locked")
      }
    } catch (err) {
      console.error("Error checking rate limiting:", err)
    }
  }

  const logLoginAttempt = async (agentIdAttempted: string, success: boolean) => {
    try {
      const supabase = createClient()
      await supabase.from("login_attempts").insert({
        agent_id_attempted: agentIdAttempted,
        success,
        user_agent: navigator.userAgent,
      })
    } catch (err) {
      console.error("Error logging attempt:", err)
    }
  }

  const logActivity = async (agentId: string, action: string, details?: Record<string, unknown>) => {
    try {
      const supabase = createClient()
      await supabase.from("activity_logs").insert({
        agent_id: agentId,
        action,
        details,
      })
    } catch (err) {
      console.error("Error logging activity:", err)
    }
  }

  const handleAgentIdSubmit = async () => {
    if (!agentId.trim() || isLocked) return

    setIsLoading(true)
    setError("")

    try {
      const supabase = createClient()

      // Check if agent ID exists in database
      const { data: agent, error: dbError } = await supabase
        .from("agents")
        .select("*")
        .eq("agent_id", agentId.trim())
        .single()

      if (dbError || !agent) {
        await logLoginAttempt(agentId.trim(), false)
        const newAttempts = localAttempts + 1
        setLocalAttempts(newAttempts)

        if (newAttempts >= MAX_ATTEMPTS_PER_AGENT) {
          setIsLocked(true)
          setLockTimeRemaining(LOCKOUT_DURATION_MINUTES * 60)
          setError("Too many failed attempts. Account temporarily locked.")
          setErrorType("locked")
        } else {
          setError(`Agent ID not found. ${MAX_ATTEMPTS_PER_AGENT - newAttempts} attempts remaining.`)
          setErrorType("warning")
        }
        setAgentId("")
        setIsLoading(false)
        return
      }

      if (agent.status === "suspended") {
        await logLoginAttempt(agentId.trim(), false)
        setError("Your account has been suspended. Please contact your supervisor.")
        setErrorType("error")
        setIsLoading(false)
        return
      }

      if (agent.status === "locked") {
        await logLoginAttempt(agentId.trim(), false)
        setError("Your account is locked. Please contact an administrator.")
        setErrorType("locked")
        setIsLoading(false)
        return
      }

      // Check if agent is temporarily locked from failed attempts
      if (agent.locked_until && new Date(agent.locked_until) > new Date()) {
        const remainingMs = new Date(agent.locked_until).getTime() - Date.now()
        setLockTimeRemaining(Math.ceil(remainingMs / 1000))
        setIsLocked(true)
        setError("Account temporarily locked due to failed attempts.")
        setErrorType("locked")
        setIsLoading(false)
        return
      }

      // Successful login - reset failed attempts and update last login
      await logLoginAttempt(agentId.trim(), true)
      await supabase
        .from("agents")
        .update({
          last_login: new Date().toISOString(),
          failed_attempts: 0,
          locked_until: null,
        })
        .eq("agent_id", agentId.trim())

      await logActivity(agentId.trim(), "login", { agent_type: agent.agent_type })

      setAgentName(agent.name)
      setAgentType(agent.agent_type || "wireless")
      setIsAdmin(agent.is_admin)
      setStep("type")
    } catch (err) {
      setError("Connection error. Please try again.")
      setErrorType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTypeSelect = async (type: AgentType) => {
    await logActivity(agentId.trim(), "select_type", { type })
    onComplete({
      name: agentName,
      type,
      agentId: agentId.trim(),
      isAdmin,
    })
  }

  const formatLockTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getErrorIcon = () => {
    switch (errorType) {
      case "locked":
        return <Clock className="h-4 w-4" />
      case "error":
        return <Ban className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            {isLocked ? (
              <ShieldAlert className="h-8 w-8 text-destructive" />
            ) : (
              <Phone className="h-8 w-8 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl">Call Flow Assistant</CardTitle>
          <CardDescription>
            {step === "agentId" && !isLocked && "Enter your Agent ID to continue"}
            {step === "agentId" && isLocked && "Access temporarily restricted"}
            {step === "type" && "Select your department"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "agentId" && (
            <div className="space-y-4">
              {isLocked && lockTimeRemaining > 0 && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-destructive" />
                  <p className="text-sm font-medium text-destructive">Account Locked</p>
                  <p className="text-2xl font-mono font-bold text-destructive mt-1">
                    {formatLockTime(lockTimeRemaining)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Please wait before trying again</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="agentId">Agent ID</Label>
                <Input
                  id="agentId"
                  type="text"
                  placeholder="Enter your Agent ID"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAgentIdSubmit()}
                  disabled={isLocked || isLoading}
                  className={isLocked ? "opacity-50" : ""}
                />
                {error && !isLocked && (
                  <div
                    className={`flex items-center gap-2 text-sm ${errorType === "warning" ? "text-amber-600" : "text-destructive"}`}
                  >
                    {getErrorIcon()}
                    {error}
                  </div>
                )}
              </div>
              <Button
                className="w-full"
                onClick={handleAgentIdSubmit}
                disabled={!agentId.trim() || isLocked || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : isLocked ? (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    Locked
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Contact your supervisor if you don't have an Agent ID
              </p>

              <div className="text-xs text-center text-muted-foreground border-t pt-4 mt-4">
                <ShieldAlert className="h-3 w-3 inline mr-1" />
                All login attempts are monitored and recorded
              </div>
            </div>
          )}

          {step === "type" && (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground mb-4">
                Welcome back, <span className="font-medium text-foreground">{agentName}</span>!
                {isAdmin && <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Admin</span>}
              </p>
              <div className="grid gap-3">
                <Button
                  variant="outline"
                  className={`h-20 flex-col gap-2 bg-transparent ${agentType === "wireless" ? "border-primary" : ""}`}
                  onClick={() => handleTypeSelect("wireless")}
                >
                  <Phone className="h-6 w-6" />
                  <span>Wireless Agent</span>
                </Button>
                <Button
                  variant="outline"
                  className={`h-20 flex-col gap-2 bg-transparent ${agentType === "cable" ? "border-primary" : ""}`}
                  onClick={() => handleTypeSelect("cable")}
                >
                  <Phone className="h-6 w-6" />
                  <span>Cable Agent</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
