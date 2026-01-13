"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScriptCard } from "@/components/script-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Wifi, CreditCard, Shield, Star, Check, Zap, Gift, Info, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { AgentType } from "@/app/page"

interface PlansOffersStepProps {
  brand: "rogers" | "fido"
  customerName: string
  agentType: AgentType
  onNext: () => void
}

const FIDO_BYOP_PLANS = [
  {
    name: "2GB Talk & Text",
    data: "2GB",
    price: 37.5,
    priceAuto: 37.5,
    speed: "4G LTE",
    features: [
      "Unlimited Canada-wide calling",
      "Unlimited text/picture/video messages",
      "Voicemail (3 messages)",
      "Call Display",
    ],
    popular: false,
  },
  {
    name: "20GB Talk & Text",
    data: "20GB",
    price: 39,
    priceAuto: 34,
    speed: "4G LTE (150 Mbps)",
    features: [
      "Unlimited Canada-wide calling",
      "Unlimited text/picture/video messages",
      "Data Overage Protection",
      "+5 Extra Data Hours",
      "Fido Roam available",
    ],
    popular: false,
  },
  {
    name: "40GB Talk & Text",
    data: "40GB",
    price: 44,
    priceAuto: 39,
    speed: "4G LTE (150 Mbps)",
    features: [
      "Unlimited Canada-wide calling",
      "Unlimited text/picture/video messages",
      "Data Overage Protection",
      "+5 Extra Data Hours",
      "Fido Roam available",
    ],
    popular: true,
  },
  {
    name: "50GB Talk & Text",
    data: "50GB",
    price: 49,
    priceAuto: 44,
    speed: "4G LTE (150 Mbps)",
    features: [
      "Unlimited Canada-wide calling",
      "Unlimited text/picture/video messages",
      "Data Overage Protection",
      "+5 Extra Data Hours",
      "Fido Roam available",
    ],
    popular: false,
  },
  {
    name: "60GB Talk & Text",
    data: "60GB",
    price: 54,
    priceAuto: 49,
    speed: "4G LTE (150 Mbps)",
    features: [
      "Unlimited Canada-wide calling",
      "Unlimited text/picture/video messages",
      "Data Overage Protection",
      "+5 Extra Data Hours",
      "Fido Roam available",
    ],
    popular: false,
  },
]

const ROGERS_WIRELESS_PLANS = [
  {
    name: "Essentials 60GB",
    data: "60GB",
    price: 65,
    speed: "5G (250 Mbps)",
    lines: { 1: 65, 2: 50, 3: 45, 4: 35 },
    features: ["Unlimited Canada-wide calling", "Unlimited messaging", "5G network access", "Rogers Roam Like Home"],
    popular: false,
  },
  {
    name: "Essentials 100GB",
    data: "100GB",
    price: 80,
    speed: "5G (250 Mbps)",
    lines: { 1: 80, 2: 60, 3: 45, 4: 35 },
    features: ["Unlimited Canada-wide calling", "Unlimited messaging", "5G network access", "Rogers Roam Like Home"],
    popular: false,
  },
  {
    name: "Popular 175GB",
    data: "175GB",
    price: 90,
    speed: "5G+ (1 Gbps)",
    lines: { 1: 90, 2: 65, 3: 60, 4: 50 },
    features: [
      "Unlimited Canada-wide calling",
      "Unlimited messaging",
      "5G+ Premium network",
      "Rogers Roam Like Home",
      "Disney+ Basic included",
    ],
    popular: true,
  },
  {
    name: "Ultimate 250GB",
    data: "250GB",
    price: 100,
    speed: "5G+ (1.5 Gbps)",
    lines: { 1: 100, 2: 85, 3: 80, 4: 70 },
    features: [
      "Unlimited Canada-wide calling",
      "Unlimited messaging",
      "5G+ Premium network",
      "Rogers Roam Like Home",
      "Disney+ Standard included",
      "Priority network access",
    ],
    popular: false,
  },
]

const FIDO_DEVICES = [
  { name: "iPhone 16", monthly: 42.8, retail: 1027, downpayment: 0, minPlan: 50, storage: "128GB" },
  { name: "iPhone 16 Pro", monthly: 58.3, retail: 1399, downpayment: 0, minPlan: 60, storage: "128GB" },
  { name: "iPhone 16 Pro Max", monthly: 66.63, retail: 1599, downpayment: 0, minPlan: 60, storage: "256GB" },
  { name: "Samsung Galaxy S25", monthly: 30.0, retail: 1199, downpayment: 0, minPlan: 50, storage: "128GB" },
  { name: "Samsung Galaxy S25 Ultra", monthly: 54.13, retail: 1649, downpayment: 0, minPlan: 60, storage: "256GB" },
  { name: "Samsung Galaxy S25 FE", monthly: 18.33, retail: 749, downpayment: 0, minPlan: 40, storage: "128GB" },
  { name: "Google Pixel 9", monthly: 37.46, retail: 1349, downpayment: 0, minPlan: 50, storage: "128GB" },
  { name: "Google Pixel 9 Pro", monthly: 45.8, retail: 1449, downpayment: 0, minPlan: 60, storage: "128GB" },
]

const ROGERS_INTERNET_PLANS = [
  {
    name: "Ignite 75u",
    download: "75 Mbps",
    upload: "10 Mbps",
    price: 50,
    features: ["Unlimited data", "WiFi Gateway included"],
  },
  {
    name: "Ignite 150u",
    download: "150 Mbps",
    upload: "15 Mbps",
    price: 65,
    features: ["Unlimited data", "WiFi Gateway included"],
  },
  {
    name: "Ignite 500u",
    download: "500 Mbps",
    upload: "20 Mbps",
    price: 85,
    features: ["Unlimited data", "WiFi Gateway included", "Ideal for 4+ devices"],
  },
  {
    name: "Ignite 1 Gbps",
    download: "1 Gbps",
    upload: "30 Mbps",
    price: 100,
    features: ["Unlimited data", "WiFi Gateway included", "Ideal for 8+ devices", "Best for streaming"],
  },
  {
    name: "Ignite 1.5 Gbps",
    download: "1.5 Gbps",
    upload: "50 Mbps",
    price: 115,
    features: ["Unlimited data", "WiFi Gateway included", "Ideal for 10+ devices", "Best for gaming & 4K"],
  },
]

const FIDO_ADDONS = [
  { name: "Visual Voicemail (iPhone)", price: 7, description: "See your voicemails as a list, play in any order" },
  { name: "Premium Voicemail-to-Text", price: 7, description: "Voicemails transcribed and sent as text" },
  { name: "Call Control", price: 3, description: "Block spam calls before your phone rings" },
  { name: "Worldwide Combo", price: 2, description: "Unlimited international texting + calls to 10 countries" },
  { name: "Unlimited US Calling", price: 15, description: "Unlimited calls from Canada to US numbers" },
  { name: "International Long Distance", price: 5, description: "Reduced rates to 60+ countries" },
  { name: "Extra Data 1GB", price: 15, description: "One-time 1GB data add-on" },
  { name: "Extra Data 3GB", price: 30, description: "One-time 3GB data add-on" },
]

const DEVICE_PROTECTION_TIERS = [
  { tier: "Tier 1", priceRange: "$0-$599", monthly: 7.99, screenRepair: 39, otherDamage: 129, lostStolen: 150 },
  { tier: "Tier 2", priceRange: "$600-$799", monthly: 9.99, screenRepair: 39, otherDamage: 129, lostStolen: 200 },
  { tier: "Tier 3", priceRange: "$800-$1499", monthly: 18.99, screenRepair: 49, otherDamage: 149, lostStolen: 300 },
  { tier: "Tier 4", priceRange: "$1500+", monthly: 21.99, screenRepair: 59, otherDamage: 199, lostStolen: 400 },
]

export function PlansOffersStep({ brand, customerName, agentType, onNext }: PlansOffersStepProps) {
  const [selectedTab, setSelectedTab] = useState("wireless")
  const brandName = brand === "rogers" ? "Rogers" : "Fido"

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
            <AlertTitle className="text-green-800">Grow Revenue - Required on Every Call</AlertTitle>
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

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 bg-muted rounded-lg text-center">
              <Gift className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Loyalty Offers</p>
              <p className="text-xs text-muted-foreground">Check OneView</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Multi-Line Savings</p>
              <p className="text-xs text-muted-foreground">Up to 40% off</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <Wifi className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Bundle & Save</p>
              <p className="text-xs text-muted-foreground">Wireless + Internet</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wireless">Wireless Plans</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          {agentType === "cable" && <TabsTrigger value="internet">Internet</TabsTrigger>}
          <TabsTrigger value="addons">Add-ons</TabsTrigger>
        </TabsList>

        <TabsContent value="wireless" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{brandName} Wireless Plans (BYOP)</CardTitle>
              <CardDescription>
                {brand === "fido"
                  ? "All plans include unlimited Canada-wide calling and texting. 4G LTE speeds. $5/mo discount with Auto Pay."
                  : "All plans include unlimited Canada-wide calling and texting. 5G network access on compatible devices."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {brand === "fido"
                  ? FIDO_BYOP_PLANS.map((plan) => (
                      <div
                        key={plan.name}
                        className={`p-4 rounded-lg border ${plan.popular ? "border-primary bg-primary/5" : "bg-muted/50"}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{plan.name}</span>
                            {plan.popular && <Badge>Most Popular</Badge>}
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold">
                              ${plan.priceAuto}
                              <span className="text-sm font-normal text-muted-foreground">/mo</span>
                            </span>
                            {plan.priceAuto !== plan.price && (
                              <p className="text-xs text-muted-foreground line-through">
                                ${plan.price} without Auto Pay
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Smartphone className="h-3 w-3" />
                            {plan.data}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            {plan.speed}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {plan.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))
                  : ROGERS_WIRELESS_PLANS.map((plan) => (
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
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Smartphone className="h-3 w-3" />
                            {plan.data}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            {plan.speed}
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs font-medium mb-1">Multi-Line Savings:</p>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span>2nd: ${plan.lines[2]}</span>
                            <span>3rd: ${plan.lines[3]}</span>
                            <span>4th+: ${plan.lines[4]}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {plan.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Plan Recommendation Scripts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ScriptCard variant="success">
                <p className="font-medium mb-2">For Light Users (under 5GB):</p>
                <p>
                  &ldquo;Based on your typical usage of about [X]GB per month, our 20GB plan at just $34/month with Auto
                  Pay would give you plenty of data with room to spare. You&apos;ll also get Data Overage Protection, so
                  you never have to worry about surprise charges. How does that sound?&rdquo;
                </p>
              </ScriptCard>

              <ScriptCard variant="success">
                <p className="font-medium mb-2">For Heavy Users (20GB+):</p>
                <p>
                  &ldquo;I can see you use quite a bit of data - about [X]GB per month. Our 50GB plan at $44/month with
                  Auto Pay would be perfect. That&apos;s over double your current usage, plus you get 5 extra hours of
                  data monthly and full speed 4G LTE. Would you like to upgrade?&rdquo;
                </p>
              </ScriptCard>

              <ScriptCard variant="success">
                <p className="font-medium mb-2">For Multi-Line Families (Rogers):</p>
                <p>
                  &ldquo;Great news - with [X] lines on your account, you qualify for significant multi-line savings!
                  Your first line would be $[X], second line just $[Y], and the third only $[Z]. That&apos;s a total
                  savings of $[amount] per month compared to individual plans. Should I set that up?&rdquo;
                </p>
              </ScriptCard>

              <ScriptCard variant="primary">
                <p className="font-medium mb-2">Highlighting Auto Pay Discount (Fido):</p>
                <p>
                  &ldquo;Quick tip - if you set up automatic payments, you&apos;ll save $5 every month on your plan.
                  It&apos;s also more convenient since you&apos;ll never miss a payment. Would you like me to set that
                  up?&rdquo;
                </p>
              </ScriptCard>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Device Financing ({brand === "fido" ? "Fido Payment Program" : "Upfront Edge"})
              </CardTitle>
              <CardDescription>
                0% APR financing over 24 months. Minimum plan requirements may apply for premium devices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {FIDO_DEVICES.map((device) => (
                  <div key={device.name} className="p-4 rounded-lg border bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold">{device.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{device.storage}</span>
                      </div>
                      <span className="text-xl font-bold">
                        ${device.monthly}
                        <span className="text-sm font-normal text-muted-foreground">/mo</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Full retail: ${device.retail}</span>
                      <span>Down: ${device.downpayment}</span>
                      <Badge variant="outline">Min ${device.minPlan}/mo plan</Badge>
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
                ? "$80 Setup Service Fee applies for phone/in-store upgrades. WAIVED for online self-serve orders on fido.ca."
                : "$60 Setup Service Fee may apply. Check current promotions for waivers."}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Device Protection Plans
              </CardTitle>
              <CardDescription>Protection against accidental damage, theft, and loss</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {DEVICE_PROTECTION_TIERS.map((tier) => (
                  <div key={tier.tier} className="p-3 rounded bg-muted">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{tier.tier}</p>
                        <p className="text-xs text-muted-foreground">Device value: {tier.priceRange}</p>
                      </div>
                      <span className="font-bold">${tier.monthly}/mo</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div>Screen: ${tier.screenRepair}</div>
                      <div>Damage: ${tier.otherDamage}</div>
                      <div>Lost: ${tier.lostStolen}</div>
                    </div>
                  </div>
                ))}
              </div>

              <ScriptCard variant="success" className="mt-4">
                <p className="font-medium mb-2">Protection Pitch:</p>
                <p>
                  &ldquo;For just $[X]/month, you can protect your new [device] against accidental damage, theft, and
                  loss. Screen repairs are only $[X], and if something happens to your phone, you&apos;ll get a
                  replacement fast. With a phone worth over $1,000, it&apos;s definitely worth the peace of mind. Should
                  I add that?&rdquo;
                </p>
              </ScriptCard>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Hardware Upgrade Scripts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ScriptCard variant="success">
                <p className="font-medium mb-2">Upgrade Eligible:</p>
                <p>
                  &ldquo;Great news, {customerName}! I see you&apos;re eligible for a hardware upgrade. The [Device
                  Name] is available for just $[X]/month with $0 down. It&apos;s got [key feature], [key feature], and
                  an amazing camera. Would you like to hear more about it?&rdquo;
                </p>
              </ScriptCard>

              <ScriptCard variant="primary">
                <p className="font-medium mb-2">Early Upgrade:</p>
                <p>
                  &ldquo;I see you have [X] months left on your current device financing. If you&apos;d like to upgrade
                  early, the remaining balance of $[X] would need to be paid. However, we do have some great trade-in
                  values that could offset that. Would you like me to check what your current phone is worth?&rdquo;
                </p>
              </ScriptCard>

              <ScriptCard variant="primary">
                <p className="font-medium mb-2">Trade-In Offer:</p>
                <p>
                  &ldquo;Your current [device] could be worth up to $[X] as a trade-in! That would bring your monthly
                  payment down to just $[X]/month for the new [device]. It&apos;s a great way to upgrade and save.
                  Interested?&rdquo;
                </p>
              </ScriptCard>
            </CardContent>
          </Card>
        </TabsContent>

        {agentType === "cable" && (
          <TabsContent value="internet" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Rogers Ignite Internet</CardTitle>
                <CardDescription>
                  All plans include unlimited data and WiFi Gateway. Prices shown with 2-year agreement.
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
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Wifi className="h-3 w-3" />↓ {plan.download}
                        </span>
                        <span>↑ {plan.upload}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {plan.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <ScriptCard variant="success">
              <p className="font-medium mb-2">Bundle Pitch:</p>
              <p>
                &ldquo;{customerName}, since you&apos;re already with us for wireless, have you considered bundling your
                internet service? You&apos;d get [Internet Plan] for $[X]/month, plus an additional $[Y] discount just
                for being a wireless customer. That&apos;s fast, reliable internet with one simple bill. Would you like
                to learn more?&rdquo;
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
              <div className="grid sm:grid-cols-2 gap-3">
                {FIDO_ADDONS.map((addon) => (
                  <div key={addon.name} className="p-3 rounded-lg border bg-muted/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{addon.name}</span>
                      <span className="font-semibold">${addon.price}/mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{addon.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-amber-800">
                <CreditCard className="h-4 w-4" />
                Rogers Bank Mastercard
              </CardTitle>
              <Badge className="bg-amber-200 text-amber-800 hover:bg-amber-200 w-fit">MUST OFFER ON EVERY CALL</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-sm mb-2">Rogers World Elite Mastercard</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" /> 4% back on Rogers/Fido bills
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" /> 2% back on groceries & dining
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" /> 1% on everything else
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" /> No annual fee
                    </li>
                  </ul>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-sm mb-2">Key Benefits</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" /> Earn cash back on every purchase
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" /> Redeem towards Rogers bill
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" /> Travel insurance included
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" /> Extended warranty protection
                    </li>
                  </ul>
                </div>
              </div>

              <ScriptCard variant="warning">
                <p className="font-medium mb-2">Rogers Bank Pitch:</p>
                <p>
                  &ldquo;{customerName}, before I let you go, I&apos;d like to tell you about an exclusive offer - the
                  Rogers Bank Mastercard. You&apos;d earn 4% cash back on your {brandName} bill every month, plus 2% on
                  groceries and dining, all with no annual fee. You can use your cash back to pay your bill or transfer
                  it to your bank. On a bill of $100/month, that&apos;s $48 back every year just on your phone bill!
                  Would you be interested in applying?&rdquo;
                </p>
              </ScriptCard>

              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="outline">
                  Interested - Send Info
                </Button>
                <Button size="sm" variant="outline">
                  Accepted - Apply Now
                </Button>
                <Button size="sm" variant="outline">
                  Already Has Card
                </Button>
                <Button size="sm" variant="outline">
                  Refused
                </Button>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Record the customer&apos;s response in OneView. This is tracked for quality and compliance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={onNext} size="lg">
          Continue to Closing
        </Button>
      </div>
    </div>
  )
}
