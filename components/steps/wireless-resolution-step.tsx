"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Signal, Smartphone, TrendingUp } from "lucide-react"

interface WirelessResolutionStepProps {
  onNext: () => void
}

export function WirelessResolutionStep({ onNext }: WirelessResolutionStepProps) {
  const [selectedIssue, setSelectedIssue] = useState("signal")

  const issues = {
    signal: {
      title: "Signal & Coverage",
      icon: <Signal className="h-5 w-5" />,
      diagnostics: [
        "Ask customer about specific locations with poor signal",
        "Check device capability (5G vs 4G LTE)",
        "Verify if customer is in coverage area",
        "Identify if issue is indoors or outdoors",
      ],
      solutions: [
        "Offer Wi-Fi calling as workaround for indoor coverage gaps",
        "Recommend device upgrade to 5G-capable phone",
        "Suggest coverage zones and alternative areas",
        "Create service ticket if confirmed coverage gap in area",
      ],
    },
    overage: {
      title: "Data Overages & Usage",
      icon: <TrendingUp className="h-5 w-5" />,
      diagnostics: [
        "Review monthly data usage patterns",
        "Check roaming charges (capped at $50 domestic, $100 roaming per CRTC)",
        "Identify peak usage times and applications",
        "Assess if customer has unlimited data or metered plan",
      ],
      solutions: [
        "Recommend unlimited plan if consistent data usage exceeds current plan",
        "Enable roaming alerts to prevent overage shock",
        "Advise on WiFi usage to reduce cellular data consumption",
        "Offer data rollover or bucket plans if available",
      ],
    },
    device: {
      title: "Device & Hardware",
      icon: <Smartphone className="h-5 w-5" />,
      diagnostics: [
        "Check device subsidy remaining and upgrade eligibility (max 24-month term)",
        "Review device age and current trade-in value",
        "Assess if device features meet customer needs (camera, battery, storage)",
        "Verify device is unlocked per CRTC requirements",
      ],
      solutions: [
        "Present new device options if eligible for upgrade",
        "Offer device financing programs (0% APR promotional terms)",
        "Discuss trade-in options for old devices",
        "Ensure customer understands device unlocking (free per CRTC)",
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
            Wireless Service Resolution
          </CardTitle>
          <CardDescription>Address mobile service issues with CRTC Wireless Code compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedIssue} onValueChange={setSelectedIssue} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signal">Signal</TabsTrigger>
              <TabsTrigger value="overage">Overages</TabsTrigger>
              <TabsTrigger value="device">Device</TabsTrigger>
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

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border border-blue-200 dark:border-blue-800 mt-4">
            <Badge className="mb-2">Wireless Code Reminder</Badge>
            <p className="text-xs text-foreground">
              All device subsidies are capped at 24 months max. Data overages domestically capped at $50, roaming at
              $100 unless customer explicitly agrees to more.
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
