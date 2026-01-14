"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, LogOut, Plus, Trash2, Users, Shield, Phone, Wifi, Loader2, RefreshCw } from "lucide-react"
import type { AgentInfo } from "@/app/page"
import { createClient } from "@/lib/supabase/client"

interface AdminPanelProps {
  agentInfo: AgentInfo
  onBack: () => void
  onLogout: () => void
}

interface Agent {
  id: string
  agent_id: string
  name: string
  is_admin: boolean
  agent_type: string
  created_at: string
  last_login: string | null
}

export function AdminPanel({ agentInfo, onBack, onLogout }: AdminPanelProps) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // New agent form
  const [newAgentId, setNewAgentId] = useState("")
  const [newAgentName, setNewAgentName] = useState("")
  const [newAgentType, setNewAgentType] = useState<string>("wireless")
  const [newAgentIsAdmin, setNewAgentIsAdmin] = useState(false)
  const [formError, setFormError] = useState("")

  const fetchAgents = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("agents").select("*").order("created_at", { ascending: true })

      if (error) throw error
      setAgents(data || [])
    } catch (err) {
      console.error("Error fetching agents:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAgents()
  }, [])

  const handleAddAgent = async () => {
    if (!newAgentId.trim() || !newAgentName.trim()) {
      setFormError("Agent ID and Name are required")
      return
    }

    setIsAdding(true)
    setFormError("")

    try {
      const supabase = createClient()

      // Check if agent ID already exists
      const { data: existing } = await supabase
        .from("agents")
        .select("agent_id")
        .eq("agent_id", newAgentId.trim())
        .single()

      if (existing) {
        setFormError("Agent ID already exists")
        setIsAdding(false)
        return
      }

      const { error } = await supabase.from("agents").insert({
        agent_id: newAgentId.trim(),
        name: newAgentName.trim(),
        agent_type: newAgentType,
        is_admin: newAgentIsAdmin,
      })

      if (error) throw error

      // Reset form and close dialog
      setNewAgentId("")
      setNewAgentName("")
      setNewAgentType("wireless")
      setNewAgentIsAdmin(false)
      setDialogOpen(false)
      fetchAgents()
    } catch (err) {
      setFormError("Failed to add agent. Please try again.")
    } finally {
      setIsAdding(false)
    }
  }

  const handleDeleteAgent = async (agent: Agent) => {
    // Prevent deleting yourself
    if (agent.agent_id === agentInfo.agentId) {
      return
    }

    setIsDeleting(agent.id)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("agents").delete().eq("id", agent.id)

      if (error) throw error
      fetchAgents()
    } catch (err) {
      console.error("Error deleting agent:", err)
    } finally {
      setIsDeleting(null)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Manage Agents</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Agents</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Users className="h-6 w-6 text-muted-foreground" />
                  {agents.length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Wireless Agents</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Phone className="h-6 w-6 text-muted-foreground" />
                  {agents.filter((a) => a.agent_type === "wireless").length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Cable Agents</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Wifi className="h-6 w-6 text-muted-foreground" />
                  {agents.filter((a) => a.agent_type === "cable").length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Agents Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Agents</CardTitle>
                  <CardDescription>Manage who can access the Call Flow Assistant</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={fetchAgents} disabled={isLoading}>
                    <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  </Button>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Agent
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Agent</DialogTitle>
                        <DialogDescription>
                          Enter the agent's details to give them access to the system.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="agentId">Agent ID</Label>
                          <Input
                            id="agentId"
                            placeholder="e.g., 203164"
                            value={newAgentId}
                            onChange={(e) => setNewAgentId(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="agentName">Agent Name</Label>
                          <Input
                            id="agentName"
                            placeholder="e.g., John Smith"
                            value={newAgentName}
                            onChange={(e) => setNewAgentName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="agentType">Default Agent Type</Label>
                          <Select value={newAgentType} onValueChange={setNewAgentType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wireless">Wireless</SelectItem>
                              <SelectItem value="cable">Cable</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="isAdmin">Admin Access</Label>
                            <p className="text-xs text-muted-foreground">Can manage other agents</p>
                          </div>
                          <Switch id="isAdmin" checked={newAgentIsAdmin} onCheckedChange={setNewAgentIsAdmin} />
                        </div>
                        {formError && <p className="text-sm text-destructive">{formError}</p>}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddAgent} disabled={isAdding}>
                          {isAdding ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add Agent"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agents.map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell className="font-mono">{agent.agent_id}</TableCell>
                        <TableCell className="font-medium">
                          {agent.name}
                          {agent.agent_id === agentInfo.agentId && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">You</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1.5">
                            {agent.agent_type === "wireless" ? (
                              <Phone className="h-3.5 w-3.5" />
                            ) : (
                              <Wifi className="h-3.5 w-3.5" />
                            )}
                            {agent.agent_type === "wireless" ? "Wireless" : "Cable"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {agent.is_admin ? (
                            <span className="flex items-center gap-1.5 text-primary">
                              <Shield className="h-3.5 w-3.5" />
                              Admin
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Agent</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{formatDate(agent.last_login)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteAgent(agent)}
                            disabled={agent.agent_id === agentInfo.agentId || isDeleting === agent.id}
                          >
                            {isDeleting === agent.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
