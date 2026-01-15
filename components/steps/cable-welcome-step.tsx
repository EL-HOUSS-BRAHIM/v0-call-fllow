"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, Cable, DollarSign } from "lucide-react"

interface CableWelcomeStepProps {
  onNext: () => void
  brand: "rogers" | "fido"
}

export function CableWelcomeStep({ onNext, brand }: CableWelcomeStepProps) {
  const greetings = {
    rogers:
      "Hello and thank you for calling Rogers. This is [Your Name] from Rogers Customer Care. May I have your account number or phone number associated with your account?",
    fido: "Hi there! Thanks for calling Fido. I'm [Your Name]. Can I get your account details or phone number?",
  }

  const keyFocusItems = [
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Internet Performance",
      description: "Assess speed, connectivity issues, and upload/download needs",
    },
    {
      icon: <Cable className="h-5 w-5" />,
      title: "Bundle Opportunities",
      description: "Review bundled services and cross-sell potential (Internet + Phone + TV)",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Cost Optimization",
      description: "Identify bill reductions, promo codes, and LTE backup value",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            Cable/Internet Welcome
          </CardTitle>
          <CardDescription>
            Establish customer connection with focus on service quality and business continuity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Opening Script:</p>
            <p className="text-sm italic">{greetings[brand]}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Key Cable/Business Focus Areas:</p>
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

          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded border border-amber-200 dark:border-amber-800">
            <Badge className="mb-2">Business Continuity Focus</Badge>
            <p className="text-xs text-foreground">
              For business accounts, emphasize reliability, uptime, and LTE backup solutions to prevent revenue loss
              from outages.
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
