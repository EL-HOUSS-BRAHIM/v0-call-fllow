"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, RefreshCw, TrendingDown } from "lucide-react"

interface WirelessWelcomeStepProps {
  onNext: () => void
  brand: "rogers" | "fido"
}

export function WirelessWelcomeStep({ onNext, brand }: WirelessWelcomeStepProps) {
  const greetings = {
    rogers:
      "Hi there! Thank you for calling Rogers Wireless. My name is [Your Name]. Can I please have your first and last name?",
    fido: "Hey! Thanks for reaching out to Fido. I'm [Your Name]. Could I get your first and last name please?",
  }

  const keyFocusItems = [
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Device Optimization",
      description: "Check upgrade eligibility and device subsidy status",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "Plan Review",
      description: "Verify current plan, data usage patterns, and billing",
    },
    {
      icon: <TrendingDown className="h-5 w-5" />,
      title: "Overage Prevention",
      description: "Monitor data overages and international roaming charges",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Wireless Welcome
          </CardTitle>
          <CardDescription>Begin the call with professional greeting and customer identification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Opening Script:</p>
            <p className="text-sm italic">{greetings[brand]}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Key Wireless Focus Areas:</p>
            {keyFocusItems.map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-background rounded border">
                <div className="text-primary flex-shrink-0 mt-0.5">{item.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border border-blue-200 dark:border-blue-800">
            <Badge className="mb-2">Wireless Code Compliance</Badge>
            <p className="text-xs text-foreground">
              Ensure customer receives contract details, CIS summary, and clear pricing information per CRTC Wireless
              Code.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={onNext} className="w-full">
        Continue to Authentication
      </Button>
    </div>
  )
}
