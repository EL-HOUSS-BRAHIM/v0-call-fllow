"use client"

import { useState } from "react"
import { AgentSetup } from "@/components/agent-setup"
import { CallFlow } from "@/components/call-flow"
import { AdminPanel } from "@/components/admin-panel"

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

  const handleSetupComplete = (info: AgentInfo) => {
    setAgentInfo(info)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAgentInfo(null)
    setShowAdmin(false)
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
