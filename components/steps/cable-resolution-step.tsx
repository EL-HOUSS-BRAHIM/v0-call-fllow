"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Wifi, Activity, Shield, Zap, Target } from "lucide-react"

interface CableResolutionStepProps {
  onNext: () => void
  accountType: "consumer" | "business"
}

export function CableResolutionStep({ onNext, accountType }: CableResolutionStepProps) {
  const [selectedIssue, setSelectedIssue] = useState("speed")

  const issues = {
    speed: {
      title: "Internet Speed Issues",
      icon: <Wifi className="h-5 w-5" />,
      discovery: [
        "What speed tier is the customer currently on? (300 Mbps, 500 Mbps, 1 Gbps, 2 Gbps)",
        "Are they experiencing slowness at specific times of day?",
        "How many devices are connected? Are they streaming 4K or gaming simultaneously?",
        "When did the issue start? (Recent change or ongoing?)",
        "Have they noticed issues with specific activities? (Video conferencing, downloads, uploads)",
      ],
      diagnostics: [
        "Run speed test from customer's location - compare to promised speeds",
        "Check for 'throttling' - if Xfinity plan exceeded limit, speeds drop to 256 Kbps (unusable)",
        "Assess modem/router placement: away from walls, metal objects, and interference sources",
        "Verify modem hardware age (recommend upgrade if 5+ years old)",
        "For business: Calculate upload speed - FTTH (fiber) = symmetric, Coax (cable) = lower uploads",
      ],
      solutions: [
        {
          label: "Optimize Hardware",
          detail: "Position modem centrally. Replace if aged. WiFi 6 router ($99) for better coverage.",
        },
        {
          label: "Plan Upgrade",
          detail: "Consistently hitting data cap? Upgrade to 500 Mbps or 1 Gbps. Show ARPU improvement.",
        },
        {
          label: "Managed WiFi",
          detail: "Business option: Meraki Managed WiFi with dashboard control ($15-25/month). Perfect for offices.",
        },
        {
          label: "LTE Backup (Business)",
          detail:
            "Cradlepoint AER1600: $575 one-time, 2-year warranty. 'Backup generator for internet'—prevents downtime costs.",
        },
      ],
    },
    reliability: {
      title: "Internet Reliability & Outages",
      icon: <Activity className="h-5 w-5" />,
      discovery: [
        "How frequently are outages occurring?",
        "How long do outages typically last? (Minutes? Hours?)",
        "What's the business impact when internet is down?",
        "Do they have any backup connectivity currently?",
        "Is this affecting critical business operations?",
      ],
      diagnostics: [
        "Check service history for outages in customer's area (planned maintenance vs. unplanned incidents)",
        "Review modem logs for disconnections, restarts, signal degradation",
        "Assess infrastructure: Fiber (FTTH) vs. Cable (Coax)—fiber more reliable for some areas",
        "Determine if equipment failure vs. line issue",
        "For business: Quantify downtime impact (lost revenue, customer impact)",
      ],
      solutions: [
        {
          label: "LTE Backup Modem",
          detail:
            "STRONGEST sell for business. Seamless failover. Protects against both planned and unplanned outages.",
        },
        {
          label: "Service Escalation",
          detail: "If area has chronic issues, escalate for engineering review. May qualify for service credit.",
        },
        {
          label: "Managed WiFi with Monitoring",
          detail: "Meraki dashboard alerts on outages. Real-time visibility for business customers.",
        },
        {
          label: "Multi-line Bundle",
          detail: "Add phone line for backup communications during outages. Bundled discount available.",
        },
      ],
    },
    security: {
      title: "Security & Network Management",
      icon: <Shield className="h-5 w-5" />,
      discovery: [
        "Is the customer concerned about security or network performance issues?",
        "Do they have business data or customer information on their network?",
        "Are they experiencing slow speeds due to too many connected devices?",
        "Do they need separate guest network for customer/visitor access?",
        "Are they aware of Secure WiFi and what it provides?",
      ],
      diagnostics: [
        "Verify Secure WiFi enabled (free, blocks malware and phishing)",
        "Check connected device count - may indicate unauthorized access",
        "Review guest network setup - many businesses lack this",
        "Assess for credential stuffing attempts in logs",
        "For business: Recommend Meraki dashboard for centralized security management",
      ],
      solutions: [
        {
          label: "Secure WiFi",
          detail: "Already included, but may be disabled. Activate at no cost. Blocks malware/phishing.",
        },
        {
          label: "Managed WiFi (Meraki)",
          detail: "Business option. Centralized control, device management, security policies, bandwidth management.",
        },
        {
          label: "Guest Network",
          detail: "Separate SSID for customers/visitors. Keeps business data isolated.",
        },
        {
          label: "Device Limit Management",
          detail: "Help prioritize devices. Remove unused devices. Ensure business critical devices have priority.",
        },
      ],
    },
    billing: {
      title: "Billing & Account Issues",
      icon: <Zap className="h-5 w-5" />,
      discovery: [
        "What specifically concerns them about their bill?",
        "Have charges increased recently? (New services added, promo ended)",
        "Are they on auto-pay or invoice billing?",
        "Do they understand their plan structure?",
        "Are there any past-due balances?",
      ],
      diagnostics: [
        "Review invoice for all charges: Internet, Phone, TV, equipment, taxes",
        "Check for promotional pricing: Did discount expire?",
        "Verify no unauthorized service additions",
        "Assess payment arrangement history",
        "Look for multi-line discounts they may not be utilizing",
      ],
      solutions: [
        {
          label: "Remove Expired Promos",
          detail: "Use Adjustment Lobby for verified errors. Apply service credits for Rogers/Fido errors only.",
        },
        {
          label: "Bundle Optimization",
          detail: "Multi-line discounts, bundled packages often cheaper than à la carte.",
        },
        {
          label: "Equipment Fees",
          detail: "Ensure customer isn't paying for multiple modems. Consolidate equipment.",
        },
        {
          label: "Switch to Online Billing",
          detail: "Optional but incentivize: paperless option, easier payment tracking.",
        },
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
            Cable/Internet Service Resolution & Discovery
          </CardTitle>
          <CardDescription>
            Use the "5 Ws" and "TED" frameworks to diagnose root causes and present tailored solutions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border border-blue-200 dark:border-blue-800">
            <Badge className="mb-2">Discovery Frameworks</Badge>
            <div className="text-xs text-foreground space-y-1">
              <p>
                <strong>5 Ws:</strong> Who (user), What (issue), When (timing), Where (location), Why (impact)
              </p>
              <p>
                <strong>TED:</strong> Tell me (open-ended), Explain to me (deeper context), Describe to me (specifics)
              </p>
            </div>
          </div>

          <Tabs value={selectedIssue} onValueChange={setSelectedIssue} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="speed" className="text-xs">
                Speed
              </TabsTrigger>
              <TabsTrigger value="reliability" className="text-xs">
                Reliability
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs">
                Security
              </TabsTrigger>
              <TabsTrigger value="billing" className="text-xs">
                Billing
              </TabsTrigger>
            </TabsList>

            {Object.entries(issues).map(([key, issue]) => (
              <TabsContent key={key} value={key} className="space-y-4 mt-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-primary">{issue.icon}</div>
                  <h3 className="font-semibold">{issue.title}</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted p-3 rounded border">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" /> Discovery Questions
                    </p>
                    <ul className="space-y-1">
                      {issue.discovery.map((q, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary">•</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-background p-3 rounded border">
                    <p className="text-sm font-medium mb-2">Diagnostic Steps:</p>
                    <ul className="space-y-1">
                      {issue.diagnostics.map((step, idx) => (
                        <li key={idx} className="text-sm text-foreground flex gap-2">
                          <span className="text-primary">→</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recommended Solutions:</p>
                    {issue.solutions.map((solution, idx) => (
                      <div
                        key={idx}
                        className="bg-green-50 dark:bg-green-950/20 p-3 rounded border border-green-200 dark:border-green-800"
                      >
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            {idx + 1}
                          </Badge>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{solution.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{solution.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {accountType === "business" && (
            <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded border border-purple-200 dark:border-purple-800">
              <Badge className="mb-2">Business-Specific Value Driver</Badge>
              <p className="text-xs text-foreground font-semibold">
                LTE Backup is the KEY differentiator for business. Frame it as "a backup generator for your internet" to
                emphasize protection from downtime costs. Cradlepoint AER1600 at $575 (2-year warranty). Average
                business values $200-500+ per hour of downtime.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={onNext} className="w-full">
        Continue to Value Creation
      </Button>
    </div>
  )
}
