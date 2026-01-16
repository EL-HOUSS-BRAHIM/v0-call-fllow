"use client"

import { useState, useEffect } from "react"
import { AgentSetup } from "@/components/agent-setup"
import { CallFlow } from "@/components/call-flow"
import { AdminPanel } from "@/components/admin-panel"
import { getAgentCookie, setAgentCookie, clearAgentCookie } from "@/lib/auth-cookies"

export type AgentType = "wireless" | "cable"
export type Brand = "rogers" | "fido"

export interface AgentInfo {
  name: string
  type: AgentType
  agentId: string
  isAdmin: boolean
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [agentInfo, setAgentInfo] = useState<AgentInfo | null>(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load agent from cookie on mount
  useEffect(() => {
    const savedAgent = getAgentCookie()
    if (savedAgent) {
      setAgentInfo(savedAgent)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleSetupComplete = (info: AgentInfo) => {
    setAgentInfo(info)
    setIsAuthenticated(true)
    setAgentCookie(info)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAgentInfo(null)
    setShowAdmin(false)
    clearAgentCookie()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !agentInfo) {
    return <AgentSetup onComplete={handleSetupComplete} />
  }

  if (showAdmin && agentInfo.isAdmin) {
    return <AdminPanel agentInfo={agentInfo} onBack={() => setShowAdmin(false)} onLogout={handleLogout} />
  }

  return (
    <CallFlow
      agentInfo={agentInfo}
      onLogout={handleLogout}
      onAdminClick={agentInfo.isAdmin ? () => setShowAdmin(true) : undefined}
    />
  )
}
