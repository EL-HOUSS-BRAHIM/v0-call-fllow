"use client"

import { useState } from "react"
import { AgentSetup } from "@/components/agent-setup"
import { CallFlow } from "@/components/call-flow"

export type AgentType = "wireless" | "cable"
export type Brand = "rogers" | "fido"

export interface AgentInfo {
  name: string
  type: AgentType
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [agentInfo, setAgentInfo] = useState<AgentInfo | null>(null)

  const handleSetupComplete = (info: AgentInfo) => {
    setAgentInfo(info)
    setIsAuthenticated(true)
  }

  if (!isAuthenticated || !agentInfo) {
    return <AgentSetup onComplete={handleSetupComplete} />
  }

  return <CallFlow agentInfo={agentInfo} onLogout={() => setIsAuthenticated(false)} />
}
