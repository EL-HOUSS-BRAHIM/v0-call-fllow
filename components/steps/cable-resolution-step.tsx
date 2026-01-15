"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Wifi, Activity, Shield } from "lucide-react"

interface CableResolutionStepProps {
  onNext: () => void
}

export function CableResolutionStep({ onNext }: CableResolutionStepProps) {
  const [selectedIssue, setSelectedIssue] = useState("speed")

  const issues = {
    speed: {
      title: "Internet Speed Issues",
      icon: <Wifi className="h-5 w-5" />,
      diagnostics: [
        "Check if customer is on optimal plan tier (300 Mbps, 500 Mbps, 1 Gbps, 2 Gbps)",
        "Run speed tests and compare to promised speeds",
        "Assess router placement and potential interference",
        "Recommend WiFi 6 modem upgrade if on older hardware",
        "Consider LTE Backup for business customers (prevents revenue loss during outages)",
      ],
      solutions: [
        "Optimize modem placement away from walls and interference",
        "Offer plan upgrade to higher speed tier if consistently hitting caps",
        "Recommend WiFi 6 or Managed WiFi upgrade for better coverage",
        "Present LTE Backup modem ($575) for businesses needing 99.9% uptime",
      ],
    },
    reliability: {
      title: "Internet Reliability & Outages",
      icon: <Activity className="h-5 w-5" />,
      diagnostics: [
        "Check service history for recent outages in customer's area",
        "Review modem logs for disconnections or restarts",
        "Assess if customer has backup internet solution",
        "For business: Calculate cost impact of downtime",
      ],
      solutions: [
        "If area has frequent outages: Present LTE Backup as essential protection",
        "Offer Managed WiFi with Meraki dashboard for monitoring",
        "Recommend multi-line bundle for backup connectivity",
        "Create action item for field technician if hardware replacement needed",
      ],
    },
    security: {
      title: "Security & Network Management",
      icon: <Shield className="h-5 w-5" />,
      diagnostics: [
        "Verify if customer has Secure WiFi enabled",
        "Check if device limit is causing network strain",
        "Assess if business customers have guest network setup",
        "Review for unauthorized access attempts",
      ],
      solutions: [
        "Enable Secure WiFi at no additional cost",
        "Offer Managed WiFi (Meraki) for businesses needing centralized control",
        "Set up separate guest networks for business use",
        "Recommend DNS filtering and firewall protections",
      ],
    },
  }

  const current = issues[selectedIssue as keyof typeof issues]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Cable Service Resolution
          </CardTitle>
          <CardDescription>Diagnose and resolve internet, phone, and bundled service issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedIssue} onValueChange={setSelectedIssue} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="speed">Speed Issues</TabsTrigger>
              <TabsTrigger value="reliability">Reliability</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {Object.entries(issues).map(([key, issue]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-primary">{issue.icon}</div>
                  <h3 className="font-semibold">{issue.title}</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Diagnostic Steps:</p>
                    <ul className="space-y-1">
                      {issue.diagnostics.map((step, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary">•</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted p-3 rounded">
                    <p className="text-sm font-medium mb-2">Recommended Solutions:</p>
                    <ul className="space-y-1">
                      {issue.solutions.map((solution, idx) => (
                        <li key={idx} className="text-sm text-foreground flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {idx + 1}
                          </Badge>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded border border-green-200 dark:border-green-800 mt-4">
            <Badge className="mb-2">LTE Backup Opportunity</Badge>
            <p className="text-xs text-foreground">
              For business customers: LTE Backup is a game-changer. Frame it as "a backup generator for your internet."
              Emphasize protection from downtime costs. Cradlepoint AER1600 modem at $575 with 2-year warranty.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={onNext} className="w-full">
        Continue to Insulate
      </Button>
    </div>
  )
}
