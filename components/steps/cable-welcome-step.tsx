"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wifi, DollarSign, Shield, PhoneOff } from "lucide-react"

interface CableWelcomeStepProps {
  onNext: () => void
  brand: "rogers" | "fido"
  accountType: "consumer" | "business"
  agentName: string
  customerName: string
  onCustomerNameChange: (name: string) => void
}

export function CableWelcomeStep({
  onNext,
  brand,
  accountType,
  agentName,
  customerName,
  onCustomerNameChange,
}: CableWelcomeStepProps) {
  const greetings = {
    rogers_consumer:
      "Hello and thank you for calling Rogers. This is [agentName] from Rogers Customer Care. Can I please have your account number or phone number associated with your account?",
    rogers_business:
      "Hi, you have reached Rogers Business Team. This is [agentName]. Can I please have your first and last name, then your account number? Thank you so much for calling today—let's get started.",
    fido_consumer:
      "Hi there! Thanks for calling Fido. I'm [agentName]. Can I get your account details or phone number?",
  }

  const getGreeting = (key: string) => {
    const greeting = greetings[key as keyof typeof greetings]
    return greeting ? greeting.replace("[agentName]", agentName) : ""
  }

  const businessFocusItems = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Voice ID & Security Verification",
      description:
        "Verify customer identity via Voice ID. If 'Consent Not Received', perform manual authentication + MFA combo.",
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Internet Uptime & Reliability",
      description: "Assess speed performance, recent outages, and business continuity needs. LTE Backup potential.",
    },
    {
      icon: <PhoneOff className="h-5 w-5" />,
      title: "Bundle Health Check",
      description: "Review Internet + Phone + TV services. Identify upgrade opportunities and cost optimization.",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Financial Opportunity",
      description:
        "Look for ARPU improvement: Multi-line discounts, Managed WiFi upgrades, LTE Backup for business continuity.",
    },
  ]

  const keyMessage =
    accountType === "business"
      ? "Take OWNERSHIP: 'You've reached the right person. I am confident I can assist you with your internet and communications services.'"
      : "Build rapport while establishing you are the right contact for their service issues."

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            Cable/Internet Welcome & Engagement
          </CardTitle>
          <CardDescription>Professional greeting and initial discovery for internet/phone services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg border border-primary/20">
            <p className="text-sm font-medium mb-2">Opening Script:</p>
            <p className="text-sm italic font-mono">{getGreeting(`${brand}_${accountType}`)}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerNameCable">Customer Name</Label>
            <Input
              id="customerNameCable"
              placeholder="Enter customer's name"
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border border-blue-200 dark:border-blue-800">
            <Badge className="mb-2">Ownership Statement</Badge>
            <p className="text-sm text-foreground font-medium">{keyMessage}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Critical Focus Areas:</p>
            {businessFocusItems.map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-background rounded border">
                <div className="text-primary flex-shrink-0 mt-0.5">{item.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded border border-amber-200 dark:border-amber-800">
            <Badge className="mb-2">Business Continuity Focus</Badge>
            <p className="text-xs text-foreground">
              For business accounts: Frame LTE Backup as "a backup generator for your internet"—emphasizing uptime
              protection and prevention of revenue loss during outages. Critical for customer retention.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={onNext} className="w-full" disabled={!customerName}>
        Continue to Authentication
      </Button>
    </div>
  )
}
