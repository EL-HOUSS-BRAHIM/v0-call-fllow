"use client"

import type { AgentInfo } from "@/app/page"

const AGENT_INFO_COOKIE = "agent_info"
const COOKIE_EXPIRY_DAYS = 7

export function setAgentCookie(agentInfo: AgentInfo) {
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS)

  const cookieValue = btoa(JSON.stringify(agentInfo))
  document.cookie = `${AGENT_INFO_COOKIE}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`
}

export function getAgentCookie(): AgentInfo | null {
  if (typeof document === "undefined") return null

  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=")
    if (name === AGENT_INFO_COOKIE && value) {
      try {
        return JSON.parse(atob(value))
      } catch (e) {
        console.error("Error parsing agent cookie:", e)
        return null
      }
    }
  }
  return null
}

export function clearAgentCookie() {
  document.cookie = `${AGENT_INFO_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`
}
