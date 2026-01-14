"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check, AlertCircle } from "lucide-react"

interface PlanComparisonProps {
  brand: "rogers" | "fido"
}

export function PlansComparison({ brand }: PlanComparisonProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // Rogers Plans based on deep dive report
  const rogersPlanTiers = {
    essentials: [
      {
        name: "Essentials 60GB",
        data: "60GB",
        speed: "250 Mbps",
        price: "$60.00",
        pricePerLine: "$43.75 (4-line avg)",
        throttle: "256 Kbps after cap",
        devices: "Limited subsidies",
        highlights: ["Entry-level pricing", "HD streaming capable", "Speed-capped 5G access"],
        bestFor: "Budget-conscious, light users",
      },
      {
        name: "Essentials 100GB",
        data: "100GB",
        speed: "250 Mbps",
        price: "$75.00",
        pricePerLine: "$50.00 (4-line avg)",
        throttle: "256 Kbps after cap",
        devices: "Limited subsidies",
        highlights: ["More data than base tier", "Same speed cap as 60GB", "Good for streaming users"],
        bestFor: "Moderate data users",
      },
    ],
    popular: [
      {
        name: "Popular 175GB",
        data: "175GB",
        speed: "1 Gbps uncapped",
        price: "$85.00",
        pricePerLine: "$61.25 (4-line avg)",
        throttle: "256 Kbps after cap",
        devices: "Full device subsidies",
        highlights: ["Uncapped 5G+ speeds", "High-volume data", "Premium device access"],
        bestFor: "Power users, 4K streaming",
      },
    ],
    ultimate: [
      {
        name: "Ultimate 250GB",
        data: "250GB+",
        speed: "1 Gbps uncapped",
        price: "$95.00",
        pricePerLine: "$65.00 (4-line avg)",
        throttle: "Variable (512 Kbps+)",
        devices: "Maximum subsidies",
        highlights: [
          "Unlimited international calling (27 countries)",
          "Roam Like Home benefits",
          "Maximum device subsidies",
          "Premium network priority",
        ],
        bestFor: "Premium users, international callers",
      },
    ],
  }

  // Fido Plans based on deep dive report
  const fidoPlanTiers = {
    entry: [
      {
        name: "Talk & Text",
        data: "None",
        speed: "4G LTE",
        price: "$30.00",
        overage: "Pay-per-use",
        devices: "No financing",
        highlights: ["Voice & messaging only", "Seniors/emergency device", "Absolute price floor"],
        bestFor: "Seniors, light users",
      },
      {
        name: "4GB Plan",
        data: "4GB",
        speed: "4G LTE (150 Mbps)",
        price: "$39.00",
        overage: "Hard cap / Pause",
        devices: "Entry-level financing",
        highlights: ["Entry-level data", "Soft overage protection", "Device financing available"],
        bestFor: "New customers, testing",
      },
    ],
    core: [
      {
        name: "40GB Plan",
        data: "40GB",
        speed: "4G LTE (150 Mbps)",
        price: "$50.00 ($44 auto-pay)",
        overage: "Hard cap - Data pause",
        devices: "Plus financing eligible",
        highlights: ["Volume driver plan", "Data Overage Protection", "+5 Extra Data Hours", "Competitive pricing"],
        bestFor: "Mainstream users",
      },
      {
        name: "60GB Plan (Sweet Spot)",
        data: "60GB",
        speed: "4G LTE (150 Mbps)",
        price: "$55.00 ($49 auto-pay)",
        overage: "Hard cap - Data pause",
        devices: "Plus financing eligible",
        highlights: ["Optimal data/price ratio", "Frequently bonused to 70-80GB", "Best value proposition"],
        bestFor: "Average users (most popular)",
      },
    ],
    premium: [
      {
        name: "100GB Plan",
        data: "100GB",
        speed: "4G LTE (150 Mbps)",
        price: "$65.00-$75.00",
        overage: "Hard cap - Data pause",
        devices: "Plus financing eligible",
        highlights: ["Heavy users", "Still 4G LTE (not 5G)", "Price-sensitive power users"],
        bestFor: "Heavy users avoiding Rogers prices",
      },
      {
        name: "Winback Rates",
        data: "30-50GB",
        speed: "4G LTE (150 Mbps)",
        price: "$29-$35",
        overage: "Exclusive to at-risk customers",
        devices: "Varies",
        highlights: ["Retention/reactivation only", "Limited time offers", "Must be threatening to leave"],
        bestFor: "Churn prevention targets",
      },
    ],
  }

  const renderPlanCard = (plan: any, carrier: string) => (
    <Card
      key={plan.name}
      className="hover:border-blue-400 transition-colors cursor-pointer"
      onClick={() => setSelectedPlan(plan.name)}
    >
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {plan.name}
          {plan.highlights?.includes("Best value proposition") && (
            <Badge variant="default" className="bg-green-500">
              Popular
            </Badge>
          )}
        </CardTitle>
        <CardDescription>{plan.bestFor}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-semibold">Data:</span> {plan.data || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Speed:</span> {plan.speed}
          </div>
          <div>
            <span className="font-semibold">Price:</span> {plan.price}
          </div>
          <div>
            <span className="font-semibold">Throttle:</span> {plan.throttle || plan.overage}
          </div>
        </div>

        <div className="space-y-1 pt-2 border-t">
          {plan.highlights?.map((h: string, i: number) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <Check className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Strategic Insights</AlertTitle>
        <AlertDescription>
          {brand === "rogers"
            ? "Rogers uses multi-line bundling to maximize ARPU. 4-line bundles show ~$17-25/line savings vs single line."
            : "Fido 60GB is the market sweet spot. 40GB is volume driver. Extended coverage (EXT) counts toward data limits."}
        </AlertDescription>
      </Alert>

      {brand === "rogers" ? (
        <Tabs defaultValue="essentials" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="essentials">Essentials</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="ultimate">Ultimate</TabsTrigger>
          </TabsList>

          <TabsContent value="essentials" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {rogersPlanTiers.essentials.map((p) => renderPlanCard(p, "rogers"))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {rogersPlanTiers.popular.map((p) => renderPlanCard(p, "rogers"))}
            </div>
          </TabsContent>

          <TabsContent value="ultimate" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {rogersPlanTiers.ultimate.map((p) => renderPlanCard(p, "rogers"))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="core" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="entry">Entry</TabsTrigger>
            <TabsTrigger value="core">Core Plans</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>

          <TabsContent value="entry" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {fidoPlanTiers.entry.map((p) => renderPlanCard(p, "fido"))}
            </div>
          </TabsContent>

          <TabsContent value="core" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {fidoPlanTiers.core.map((p) => renderPlanCard(p, "fido"))}
            </div>
          </TabsContent>

          <TabsContent value="premium" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {fidoPlanTiers.premium.map((p) => renderPlanCard(p, "fido"))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
