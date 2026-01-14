"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Phone, Wifi, AlertCircle, Loader2 } from "lucide-react"
import type { AgentInfo, AgentType } from "@/app/page"
import { createClient } from "@/lib/supabase/client"

interface AgentSetupProps {
  onComplete: (info: AgentInfo) => void
}

export function AgentSetup({ onComplete }: AgentSetupProps) {
  const [step, setStep] = useState<"agentId" | "type">("agentId")
  const [agentId, setAgentId] = useState("")
  const [agentName, setAgentName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const MAX_ATTEMPTS = 5

  const handleAgentIdSubmit = async () => {
    if (!agentId.trim()) return

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
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        if (newAttempts >= MAX_ATTEMPTS) {
          setError("Too many failed attempts. Please contact your supervisor.")
        } else {
          setError(`Agent ID not found. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
        }
        setAgentId("")
        setIsLoading(false)
        return
      }

      // Update last login
      await supabase.from("agents").update({ last_login: new Date().toISOString() }).eq("agent_id", agentId.trim())

      setAgentName(agent.name)
      setIsAdmin(agent.is_admin)
      setStep("type")
    } catch (err) {
      setError("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTypeSelect = (type: AgentType) => {
    onComplete({
      name: agentName,
      type,
      agentId: agentId.trim(),
      isAdmin,
    })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Phone className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Call Flow Assistant</CardTitle>
          <CardDescription>
            {step === "agentId" && "Enter your Agent ID to continue"}
            {step === "type" && "Select your department"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "agentId" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agentId">Agent ID</Label>
                <Input
                  id="agentId"
                  type="text"
                  placeholder="Enter your Agent ID"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAgentIdSubmit()}
                  disabled={attempts >= MAX_ATTEMPTS || isLoading}
                />
                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </div>
              <Button
                className="w-full"
                onClick={handleAgentIdSubmit}
                disabled={!agentId.trim() || attempts >= MAX_ATTEMPTS || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Contact your supervisor if you don't have an Agent ID
              </p>
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
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => handleTypeSelect("wireless")}
                >
                  <Phone className="h-6 w-6" />
                  <span>Wireless Agent</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => handleTypeSelect("cable")}
                >
                  <Wifi className="h-6 w-6" />
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
