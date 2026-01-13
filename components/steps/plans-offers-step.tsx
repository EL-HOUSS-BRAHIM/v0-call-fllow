"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScriptCard } from "@/components/script-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Wifi, CreditCard, Shield, Star } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { AgentType } from "@/app/page"

interface PlansOffersStepProps {
  brand: "rogers" | "fido"
  customerName: string
  agentType: AgentType
  onNext: () => void
}

const FIDO_WIRELESS_PLANS = [
  { name: "Talk & Text", data: "No Data", price: 30, speed: "N/A", popular: false },
  { name: "40GB Plan", data: "40GB", price: 50, speed: "4G LTE (150 Mbps)", popular: false },
  { name: "60GB Plan", data: "60GB", price: 55, speed: "4G LTE (150 Mbps)", popular: true },
  { name: "100GB Plan", data: "100GB", price: 65, speed: "4G LTE (150 Mbps)", popular: false },
  { name: "120GB Plan", data: "120GB", price: 75, speed: "4G LTE (150 Mbps)", popular: false },
]

const ROGERS_WIRELESS_PLANS = [
  {
    name: "Essentials 60GB",
    data: "60GB",
    price: 60,
    speed: "5G (250 Mbps)",
    lines: { 1: 60, 2: 45, 3: 40, 4: 30 },
    popular: false,
  },
  {
    name: "Essentials 100GB",
    data: "100GB",
    price: 75,
    speed: "5G (250 Mbps)",
    lines: { 1: 75, 2: 55, 3: 40, 4: 30 },
    popular: false,
  },
  {
    name: "Popular 175GB",
    data: "175GB",
    price: 85,
    speed: "5G+ (1 Gbps)",
    lines: { 1: 85, 2: 60, 3: 55, 4: 45 },
    popular: true,
  },
  {
    name: "Ultimate 250GB",
    data: "250GB",
    price: 95,
    speed: "5G+ (1 Gbps)",
    lines: { 1: 95, 2: 80, 3: 75, 4: 65 },
    popular: false,
  },
]

const FIDO_DEVICES = [
  { name: "iPhone 16", monthly: 42.8, retail: 1027, downpayment: 0 },
  { name: "Samsung Galaxy S25 FE", monthly: 18.33, retail: 1112, downpayment: 0 },
  { name: "Samsung Galaxy S25", monthly: 30.0, retail: 1450, downpayment: 0 },
  { name: "Google Pixel 10", monthly: 45.8, retail: 1287, downpayment: 0 },
]

const ROGERS_INTERNET_PLANS = [
  { name: "Starter 50", download: "50 Mbps", upload: "10 Mbps", price: 60 },
  { name: "Starter 100", download: "100 Mbps", upload: "30 Mbps", price: 75 },
  { name: "Essentials 300", download: "300 Mbps", upload: "30 Mbps", price: 90 },
  { name: "Popular 500", download: "500 Mbps", upload: "50 Mbps", price: 100 },
  { name: "Ultimate 1.5G", download: "1.5 Gbps", upload: "150 Mbps", price: 110 },
]

const ADDONS = [
  { name: "Visual Voicemail (iPhone)", price: 7 },
  { name: "Premium Voicemail-to-Text", price: 7 },
  { name: "Worldwide Combo", price: 2, description: "Unlimited intl texting + calls to US, China, India, etc." },
  { name: "Unlimited US Calling", price: 15 },
]

export function PlansOffersStep({ brand, customerName, agentType, onNext }: PlansOffersStepProps) {
  const [selectedTab, setSelectedTab] = useState("wireless")
  const brandName = brand === "rogers" ? "Rogers" : "Fido"
  const wirelessPlans = brand === "rogers" ? ROGERS_WIRELESS_PLANS : FIDO_WIRELESS_PLANS

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Plans & Offers
          </CardTitle>
          <CardDescription>
            Present relevant offers based on customer needs. Remember to disposition in OneView!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-200 bg-green-50">
            <Star className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Grow Revenue</AlertTitle>
            <AlertDescription className="text-green-700">
              Rogers Bank, Broadband, and HUP offers MUST be offered on every call. Disposition accurately in OneView.
            </AlertDescription>
          </Alert>

          <ScriptCard variant="primary">
            <p>
              &ldquo;{customerName}, I see that your account is selected for several loyalty offers. Let me share some
              options that could benefit you.&rdquo;
            </p>
          </ScriptCard>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wireless">Wireless</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          {agentType === "cable" && <TabsTrigger value="internet">Internet</TabsTrigger>}
          <TabsTrigger value="addons">Add-ons</TabsTrigger>
        </TabsList>

        <TabsContent value="wireless" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{brandName} Wireless Plans</CardTitle>
              <CardDescription>
                {brand === "fido"
                  ? "All plans include unlimited Canada-wide calling and texting. 4G LTE speeds (150 Mbps max)."
                  : "All plans include unlimited Canada-wide calling and texting. Auto-pay discount applied."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {wirelessPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`p-4 rounded-lg border ${plan.popular ? "border-primary bg-primary/5" : "bg-muted/50"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{plan.name}</span>
                        {plan.popular && <Badge>Most Popular</Badge>}
                      </div>
                      <span className="text-2xl font-bold">
                        ${plan.price}
                        <span className="text-sm font-normal text-muted-foreground">/mo</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        {plan.data}
                      </span>
                      <span>{plan.speed}</span>
                    </div>
                    {brand === "rogers" && "lines" in plan && (
                      <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                        Multi-line: 2nd line ${plan.lines[2]} | 3rd ${plan.lines[3]} | 4th+ ${plan.lines[4]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <ScriptCard variant="success">
            <p>
              <strong>Script:</strong> &ldquo;Based on your usage, I&apos;d recommend the [PLAN NAME]. It gives you
              [DATA] of high-speed data for just $[PRICE] per month. Would you like me to update your plan?&rdquo;
            </p>
          </ScriptCard>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Device Financing ({brand === "fido" ? "Fido Payment Program" : "Upfront Edge"})
              </CardTitle>
              <CardDescription>
                0% APR financing over 24 months. Requires minimum $50/mo plan for premium devices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {FIDO_DEVICES.map((device) => (
                  <div key={device.name} className="p-4 rounded-lg border bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{device.name}</span>
                      <span className="text-xl font-bold">
                        ${device.monthly}
                        <span className="text-sm font-normal text-muted-foreground">/mo</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Full retail: ${device.retail}</span>
                      <span>Down payment: ${device.downpayment}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <CreditCard className="h-4 w-4" />
            <AlertTitle>Setup Service Fee</AlertTitle>
            <AlertDescription>
              {brand === "fido"
                ? "$80 Setup Service Fee applies for in-store/phone upgrades. Waived for online orders."
                : "Standard activation fees may apply. Check current promotions."}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Device Protection Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-3 rounded bg-muted">
                  <p className="font-medium">Tier 1 ($0-$599)</p>
                  <p className="text-muted-foreground">$7.99/mo</p>
                </div>
                <div className="p-3 rounded bg-muted">
                  <p className="font-medium">Tier 2 ($600-$799)</p>
                  <p className="text-muted-foreground">$9.99/mo</p>
                </div>
                <div className="p-3 rounded bg-muted">
                  <p className="font-medium">Tier 3 ($800-$1499)</p>
                  <p className="text-muted-foreground">$18.99/mo</p>
                </div>
                <div className="p-3 rounded bg-muted">
                  <p className="font-medium">Tier 4 ($1500+)</p>
                  <p className="text-muted-foreground">$21.99/mo</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Screen repair: $39 | Other damage: $129 | Lost/Stolen: $150-$400
              </p>
            </CardContent>
          </Card>

          <ScriptCard variant="success">
            <p>
              <strong>Script:</strong> &ldquo;I see you&apos;re eligible for a hardware upgrade! The [DEVICE] is
              available for just $[MONTHLY]/month with no down payment. Shall I check what colors are in stock?&rdquo;
            </p>
          </ScriptCard>
        </TabsContent>

        {agentType === "cable" && (
          <TabsContent value="internet" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Rogers Xfinity Internet</CardTitle>
                <CardDescription>
                  All plans include unlimited data and WiFi Gateway. Prices with 24-month term and Auto-Pay.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ROGERS_INTERNET_PLANS.map((plan) => (
                    <div key={plan.name} className="p-4 rounded-lg border bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{plan.name}</span>
                        <span className="text-xl font-bold">
                          ${plan.price}
                          <span className="text-sm font-normal text-muted-foreground">/mo</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Wifi className="h-3 w-3" />↓ {plan.download}
                        </span>
                        <span>↑ {plan.upload}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <ScriptCard variant="success">
              <p>
                <strong>Script:</strong> &ldquo;{customerName}, I notice you could save by bundling your services. With
                [INTERNET PLAN], you&apos;d get [SPEED] for $[PRICE]/month, plus exclusive savings on your wireless
                plan. Would you like to hear more?&rdquo;
              </p>
            </ScriptCard>
          </TabsContent>
        )}

        <TabsContent value="addons" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Value-Added Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ADDONS.map((addon) => (
                  <div key={addon.name} className="p-3 rounded-lg border bg-muted/50 flex items-center justify-between">
                    <div>
                      <span className="font-medium">{addon.name}</span>
                      {addon.description && <p className="text-xs text-muted-foreground">{addon.description}</p>}
                    </div>
                    <span className="font-semibold">${addon.price}/mo</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-amber-800">
                <CreditCard className="h-4 w-4" />
                Rogers Bank Card
              </CardTitle>
              <Badge className="bg-amber-200 text-amber-800 hover:bg-amber-200">MUST OFFER ON EVERY CALL</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <ScriptCard variant="warning">
                <p>
                  &ldquo;{customerName}, I&apos;d like to tell you about an exclusive card on the market - the Rogers
                  Bank card. [List benefits]. Would you be interested in learning more?&rdquo;
                </p>
              </ScriptCard>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Interested
                </Button>
                <Button size="sm" variant="outline">
                  Accepted
                </Button>
                <Button size="sm" variant="outline">
                  Refused
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={onNext}>Continue to Closing</Button>
      </div>
    </div>
  )
}
