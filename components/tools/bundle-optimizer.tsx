"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Users } from "lucide-react"

interface BundleOptimizerProps {
  brand: "rogers" | "fido"
}

export function BundleOptimizer({ brand }: BundleOptimizerProps) {
  const [numLines, setNumLines] = useState(4)
  const [selectedPlan, setSelectedPlan] = useState("Popular")

  const rogersBundles = {
    "Essentials 60GB": { single: 60, line2: 45, line3: 40, line4: 30 },
    "Essentials 100GB": { single: 75, line2: 55, line3: 40, line4: 30 },
    "Popular 175GB": { single: 85, line2: 60, line3: 55, line4: 45 },
    "Ultimate 250GB": { single: 95, line2: 80, line3: 75, line4: 65 },
  }

  const calculateRogers = () => {
    const plan = rogersBundles[selectedPlan as keyof typeof rogersBundles]
    if (!plan) return { total: 0, perLine: 0, saving: 0 }

    let total = plan.single
    const avgPrice = plan.single

    if (numLines >= 2) total += plan.line2
    if (numLines >= 3) total += plan.line3
    if (numLines >= 4) total += plan.line4

    const singleLineTotal = avgPrice * numLines
    const saving = singleLineTotal - total

    return {
      total,
      perLine: total / numLines,
      saving,
    }
  }

  const result = calculateRogers()

  return (
    <div className="space-y-4">
      <Alert>
        <Users className="h-4 w-4" />
        <AlertTitle>Multi-Line Strategy</AlertTitle>
        <AlertDescription>
          Rogers' primary retention strategy is bundling. A 4-line customer is 50%+ less likely to churn than a 1-line
          customer.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rogers Multi-Line Bundle Calculator</CardTitle>
          <CardDescription>Optimization for family accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Select Plan Tier</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(rogersBundles).map((plan) => (
                <Button
                  key={plan}
                  variant={selectedPlan === plan ? "default" : "outline"}
                  onClick={() => setSelectedPlan(plan)}
                  className="text-xs"
                >
                  {plan.split(" ")[0]}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Number of Lines</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <Button
                  key={n}
                  variant={numLines === n ? "default" : "outline"}
                  onClick={() => setNumLines(n)}
                  size="sm"
                >
                  {n}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Monthly Cost:</span>
              <span className="text-xl font-bold text-blue-600">${result.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Per Line:</span>
              <span className="text-lg font-semibold">${result.perLine.toFixed(2)}</span>
            </div>
            {result.saving > 0 && (
              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                <span className="text-sm font-semibold text-green-700">Monthly Savings vs Single Lines:</span>
                <Badge variant="default" className="bg-green-600">
                  ${result.saving.toFixed(2)}
                </Badge>
              </div>
            )}
          </div>

          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertDescription className="text-xs text-yellow-800">
              <strong>Agent Tactic:</strong> If customer mentions cancel, quote them the per-line savings from a bundle.
              A 4-line family saves ~$100/month vs individual lines.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {brand === "fido" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fido Note</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            Fido does not publish aggressive multi-line discounts like Rogers. Pricing is typically consistent across
            lines, making Fido more attractive to single-line and 2-line customers.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
