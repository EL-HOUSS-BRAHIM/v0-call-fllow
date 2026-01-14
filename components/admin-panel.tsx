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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  LogOut,
  Plus,
  Trash2,
  Users,
  Shield,
  Phone,
  Wifi,
  Loader2,
  RefreshCw,
  Ban,
  CheckCircle,
  Lock,
  Unlock,
  Edit,
  Activity,
  AlertTriangle,
  History,
  UserX,
  UserCheck,
} from "lucide-react"
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
  status: string
  failed_attempts: number
  locked_until: string | null
  notes: string | null
  created_at: string
  last_login: string | null
}

interface LoginAttempt {
  id: string
  agent_id_attempted: string
  ip_address: string
  user_agent: string
  success: boolean
  created_at: string
}

interface ActivityLog {
  id: string
  agent_id: string
  action: string
  details: Record<string, unknown>
  ip_address: string
  created_at: string
}

export function AdminPanel({ agentInfo, onBack, onLogout }: AdminPanelProps) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [activeTab, setActiveTab] = useState("agents")

  // New agent form
  const [newAgentId, setNewAgentId] = useState("")
  const [newAgentName, setNewAgentName] = useState("")
  const [newAgentType, setNewAgentType] = useState<string>("wireless")
  const [newAgentIsAdmin, setNewAgentIsAdmin] = useState(false)
  const [formError, setFormError] = useState("")

  // Edit form
  const [editName, setEditName] = useState("")
  const [editType, setEditType] = useState("wireless")
  const [editIsAdmin, setEditIsAdmin] = useState(false)
  const [editStatus, setEditStatus] = useState("active")
  const [editNotes, setEditNotes] = useState("")

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

  const fetchLoginAttempts = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("login_attempts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100)

      if (error) throw error
      setLoginAttempts(data || [])
    } catch (err) {
      console.error("Error fetching login attempts:", err)
    }
  }

  const fetchActivityLogs = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100)

      if (error) throw error
      setActivityLogs(data || [])
    } catch (err) {
      console.error("Error fetching activity logs:", err)
    }
  }

  useEffect(() => {
    fetchAgents()
    fetchLoginAttempts()
    fetchActivityLogs()
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
        status: "active",
      })

      if (error) throw error

      // Log activity
      await supabase.from("activity_logs").insert({
        agent_id: agentInfo.agentId,
        action: "create_agent",
        details: { created_agent_id: newAgentId.trim(), name: newAgentName.trim() },
      })

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

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent)
    setEditName(agent.name)
    setEditType(agent.agent_type)
    setEditIsAdmin(agent.is_admin)
    setEditStatus(agent.status || "active")
    setEditNotes(agent.notes || "")
    setEditDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!editingAgent) return

    setIsUpdating(editingAgent.id)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("agents")
        .update({
          name: editName,
          agent_type: editType,
          is_admin: editIsAdmin,
          status: editStatus,
          notes: editNotes,
          // Clear lock if status is changed to active
          ...(editStatus === "active" ? { locked_until: null, failed_attempts: 0 } : {}),
        })
        .eq("id", editingAgent.id)

      if (error) throw error

      // Log activity
      await supabase.from("activity_logs").insert({
        agent_id: agentInfo.agentId,
        action: "update_agent",
        details: {
          updated_agent_id: editingAgent.agent_id,
          changes: { name: editName, status: editStatus, is_admin: editIsAdmin },
        },
      })

      setEditDialogOpen(false)
      setEditingAgent(null)
      fetchAgents()
    } catch (err) {
      console.error("Error updating agent:", err)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleQuickAction = async (agent: Agent, action: "suspend" | "activate" | "lock" | "unlock" | "reset") => {
    setIsUpdating(agent.id)

    try {
      const supabase = createClient()
      let updateData: Partial<Agent> = {}

      switch (action) {
        case "suspend":
          updateData = { status: "suspended" }
          break
        case "activate":
          updateData = { status: "active", locked_until: null, failed_attempts: 0 }
          break
        case "lock":
          updateData = { status: "locked" }
          break
        case "unlock":
          updateData = { status: "active", locked_until: null, failed_attempts: 0 }
          break
        case "reset":
          updateData = { failed_attempts: 0, locked_until: null }
          break
      }

      const { error } = await supabase.from("agents").update(updateData).eq("id", agent.id)

      if (error) throw error

      // Log activity
      await supabase.from("activity_logs").insert({
        agent_id: agentInfo.agentId,
        action: `agent_${action}`,
        details: { target_agent_id: agent.agent_id, target_name: agent.name },
      })

      fetchAgents()
    } catch (err) {
      console.error("Error performing action:", err)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleDeleteAgent = async (agent: Agent) => {
    if (agent.agent_id === agentInfo.agentId) return

    setIsUpdating(agent.id)

    try {
      const supabase = createClient()

      // Log before delete
      await supabase.from("activity_logs").insert({
        agent_id: agentInfo.agentId,
        action: "delete_agent",
        details: { deleted_agent_id: agent.agent_id, deleted_name: agent.name },
      })

      const { error } = await supabase.from("agents").delete().eq("id", agent.id)

      if (error) throw error
      fetchAgents()
    } catch (err) {
      console.error("Error deleting agent:", err)
    } finally {
      setIsUpdating(null)
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="default" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Ban className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        )
      case "locked":
        return (
          <Badge variant="default" className="bg-red-500/10 text-red-600 border-red-500/20">
            <Lock className="h-3 w-3 mr-1" />
            Locked
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const suspendedCount = agents.filter((a) => a.status === "suspended").length
  const lockedCount = agents.filter((a) => a.status === "locked" || a.locked_until).length
  const failedAttemptsToday = loginAttempts.filter(
    (a) => !a.success && new Date(a.created_at).toDateString() === new Date().toDateString(),
  ).length

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
              <p className="text-xs text-muted-foreground">Security & Agent Management</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <CardDescription>Active</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2 text-green-600">
                  <UserCheck className="h-6 w-6" />
                  {agents.filter((a) => a.status === "active").length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Suspended/Locked</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2 text-amber-600">
                  <UserX className="h-6 w-6" />
                  {suspendedCount + lockedCount}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Failed Logins Today</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-6 w-6" />
                  {failedAttemptsToday}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Agents
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Login Attempts
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Activity Log
              </TabsTrigger>
            </TabsList>

            {/* Agents Tab */}
            <TabsContent value="agents">
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
                            <DialogDescription>Enter the agent's details to give them access.</DialogDescription>
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
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Agent ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
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
                                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                    You
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>{getStatusBadge(agent.status || "active")}</TableCell>
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
                              <TableCell className="text-muted-foreground text-sm">
                                {formatDate(agent.last_login)}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {/* Quick Actions */}
                                  {agent.agent_id !== agentInfo.agentId && (
                                    <>
                                      {agent.status === "active" ? (
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                          onClick={() => handleQuickAction(agent, "suspend")}
                                          disabled={isUpdating === agent.id}
                                          title="Suspend"
                                        >
                                          <Ban className="h-4 w-4" />
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                          onClick={() => handleQuickAction(agent, "activate")}
                                          disabled={isUpdating === agent.id}
                                          title="Activate"
                                        >
                                          <Unlock className="h-4 w-4" />
                                        </Button>
                                      )}
                                    </>
                                  )}
                                  {agent.failed_attempts > 0 && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                      onClick={() => handleQuickAction(agent, "reset")}
                                      disabled={isUpdating === agent.id}
                                      title={`Reset ${agent.failed_attempts} failed attempts`}
                                    >
                                      <History className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleEditAgent(agent)}
                                    disabled={isUpdating === agent.id}
                                    title="Edit"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  {agent.agent_id !== agentInfo.agentId && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                      onClick={() => handleDeleteAgent(agent)}
                                      disabled={isUpdating === agent.id}
                                      title="Delete"
                                    >
                                      {isUpdating === agent.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Trash2 className="h-4 w-4" />
                                      )}
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab - Login Attempts */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Login Attempts</CardTitle>
                      <CardDescription>Monitor all login activity for security</CardDescription>
                    </div>
                    <Button variant="outline" size="icon" onClick={fetchLoginAttempts}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Agent ID Attempted</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Browser</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loginAttempts.map((attempt) => (
                          <TableRow key={attempt.id}>
                            <TableCell className="text-sm">{formatDate(attempt.created_at)}</TableCell>
                            <TableCell className="font-mono">{attempt.agent_id_attempted || "N/A"}</TableCell>
                            <TableCell>
                              {attempt.success ? (
                                <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Success
                                </Badge>
                              ) : (
                                <Badge variant="default" className="bg-red-500/10 text-red-600 border-red-500/20">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Failed
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                              {attempt.user_agent?.split(" ").slice(0, 3).join(" ") || "Unknown"}
                            </TableCell>
                          </TableRow>
                        ))}
                        {loginAttempts.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                              No login attempts recorded
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Activity Log</CardTitle>
                      <CardDescription>Track all agent actions in the system</CardDescription>
                    </div>
                    <Button variant="outline" size="icon" onClick={fetchActivityLogs}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Agent</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activityLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="text-sm">{formatDate(log.created_at)}</TableCell>
                            <TableCell className="font-mono">{log.agent_id}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {log.action.replace(/_/g, " ")}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground max-w-[300px]">
                              {log.details ? JSON.stringify(log.details).slice(0, 100) : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                        {activityLogs.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                              No activity logged yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Agent Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
            <DialogDescription>Update agent details for {editingAgent?.agent_id}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Name</Label>
              <Input id="editName" value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editType">Agent Type</Label>
              <Select value={editType} onValueChange={setEditType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wireless">Wireless</SelectItem>
                  <SelectItem value="cable">Cable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editStatus">Status</Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Active
                    </span>
                  </SelectItem>
                  <SelectItem value="suspended">
                    <span className="flex items-center gap-2">
                      <Ban className="h-4 w-4 text-amber-600" />
                      Suspended
                    </span>
                  </SelectItem>
                  <SelectItem value="locked">
                    <span className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-red-600" />
                      Locked
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {editingAgent?.agent_id !== agentInfo.agentId && (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="editIsAdmin">Admin Access</Label>
                  <p className="text-xs text-muted-foreground">Can manage other agents</p>
                </div>
                <Switch id="editIsAdmin" checked={editIsAdmin} onCheckedChange={setEditIsAdmin} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="editNotes">Notes</Label>
              <Textarea
                id="editNotes"
                placeholder="Internal notes about this agent..."
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isUpdating === editingAgent?.id}>
              {isUpdating === editingAgent?.id ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
