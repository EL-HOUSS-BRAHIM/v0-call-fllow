"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScriptCard } from "@/components/script-card"
import {
  Wrench,
  CreditCard,
  FileText,
  Settings,
  Globe,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Phone,
  MessageSquare,
  Signal,
  RefreshCw,
  Plane,
  MapPin,
  Users,
  TrendingDown,
  Gift,
  UserPlus,
  Smartphone,
  Home,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AgentType } from "@/app/page"

interface ProblemResolutionStepProps {
  agentName: string
  brand: "rogers" | "fido"
  customerName: string
  agentType: AgentType
  onNext: () => void
}

const PROBLEM_CATEGORIES = [
  { id: "join", label: "New Customer / Join", icon: UserPlus, description: "Customer wants to join Rogers/Fido" },
  { id: "billing", label: "Billing Inquiry", icon: CreditCard, description: "Bill questions, charges, credits" },
  { id: "account", label: "Account Changes", icon: Settings, description: "Update info, add/remove services" },
  { id: "technical", label: "Technical Support", icon: Wrench, description: "Service issues, troubleshooting" },
  { id: "roaming", label: "Roaming/Travel", icon: Globe, description: "Travel plans, roaming charges" },
  { id: "churn", label: "Cancellation", icon: AlertCircle, description: "Customer wants to cancel" },
  { id: "general", label: "General Inquiry", icon: HelpCircle, description: "Other questions" },
]

export function ProblemResolutionStep({
  agentName,
  brand,
  customerName,
  agentType,
  onNext,
}: ProblemResolutionStepProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const brandName = brand === "rogers" ? "Rogers" : "Fido"

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Discover & Resolve
          </CardTitle>
          <CardDescription>Understand the customer&apos;s issue and work towards resolution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScriptCard variant="primary">
            <p>
              &ldquo;{customerName}, I&apos;d like to ask you a few questions to help me find the best solution for you.
              Is that okay with you?&rdquo;
            </p>
          </ScriptCard>

          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Set Expectations</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>
                &ldquo;Thank you for confirming; I will take a few minutes to work on your request in silence, or would
                you be more comfortable with a musical hold?&rdquo;
              </p>
            </AlertDescription>
          </Alert>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Key Discovery Questions:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• &ldquo;When did you first notice this issue?&rdquo;</li>
              <li>• &ldquo;Has anything changed recently with your service?&rdquo;</li>
              <li>• &ldquo;Have you tried any troubleshooting steps already?&rdquo;</li>
              <li>• &ldquo;How is this affecting your day-to-day use?&rdquo;</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">What is the customer calling about?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROBLEM_CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                className="h-auto py-4 flex-col items-start text-left"
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <cat.icon className="h-4 w-4" />
                  <span className="font-medium">{cat.label}</span>
                </div>
                <span className="text-xs opacity-70">{cat.description}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedCategory === "join" && (
        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-green-800">
              <UserPlus className="h-4 w-4" />
              New Customer - Welcome to {brandName}!
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-green-100 text-green-800">New Acquisition</Badge>
              <Badge variant="outline">Probing Questions Required</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <Sparkles className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">New Customer Opportunity</AlertTitle>
              <AlertDescription className="text-green-700">
                This customer is interested in joining {brandName}! Use probing questions to understand their needs and
                find the best package for them.
              </AlertDescription>
            </Alert>

            <ScriptCard variant="success">
              <p>
                &ldquo;Welcome to {brandName}, {customerName}! I&apos;m excited to help you find the perfect plan today.
                May I ask a few questions to understand your needs better and ensure I recommend the best options for
                you?&rdquo;
              </p>
            </ScriptCard>

            <Tabs defaultValue="probing" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="probing">Probing Questions</TabsTrigger>
                <TabsTrigger value="scenarios">Common Scenarios</TabsTrigger>
                <TabsTrigger value="byod">BYOD Process</TabsTrigger>
                <TabsTrigger value="selfserve">Self-Serve Setup</TabsTrigger>
              </TabsList>

              <TabsContent value="probing" className="space-y-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Essential Probing Questions
                    </CardTitle>
                    <CardDescription>Ask these to find the best package</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="interest">
                        <AccordionTrigger>1. What package interests them?</AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          <ScriptCard variant="primary">
                            <p>
                              &ldquo;What packages have you been looking at on{" "}
                              {brand === "fido" ? "fido.ca" : "rogers.com"}? Is there a specific plan or offer that
                              caught your attention?&rdquo;
                            </p>
                          </ScriptCard>
                          <div className="p-3 bg-muted rounded-lg text-sm">
                            <p className="font-medium mb-2">Why ask this:</p>
                            <ul className="text-muted-foreground space-y-1">
                              <li>• Understand what they&apos;ve already researched</li>
                              <li>• Know their price expectations</li>
                              <li>• Identify if they have misconceptions about offers</li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="household">
                        <AccordionTrigger>2. Who is this for?</AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          <ScriptCard variant="primary">
                            <p>
                              &ldquo;Is this plan just for yourself, or are you looking to set up service for other
                              family members as well? How many lines would you need in total?&rdquo;
                            </p>
                          </ScriptCard>
                          <div className="p-3 bg-muted rounded-lg text-sm">
                            <p className="font-medium mb-2">Family scenarios to explore:</p>
                            <ul className="text-muted-foreground space-y-1">
                              <li>
                                • <strong>Single user:</strong> Focus on individual plan value
                              </li>
                              <li>
                                • <strong>Couple:</strong> Shared data options, multi-line discount
                              </li>
                              <li>
                                • <strong>Family with kids:</strong> Parental controls, data management
                              </li>
                              <li>
                                • <strong>Family with teens/adults:</strong> Individual data needs per line
                              </li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="usage">
                        <AccordionTrigger>3. What&apos;s their usage pattern?</AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          <ScriptCard variant="primary">
                            <p>
                              &ldquo;Help me understand how you typically use your phone. Do you stream a lot of videos?
                              Work from home? Travel frequently? This helps me find the right data amount for
                              you.&rdquo;
                            </p>
                          </ScriptCard>
                          <div className="grid sm:grid-cols-2 gap-2 text-sm">
                            <div className="p-2 bg-muted rounded">
                              <p className="font-medium">Light User (5-15GB)</p>
                              <p className="text-xs text-muted-foreground">Email, social media, light browsing</p>
                            </div>
                            <div className="p-2 bg-muted rounded">
                              <p className="font-medium">Moderate (20-50GB)</p>
                              <p className="text-xs text-muted-foreground">Streaming music, video calls, GPS</p>
                            </div>
                            <div className="p-2 bg-muted rounded">
                              <p className="font-medium">Heavy (60-100GB)</p>
                              <p className="text-xs text-muted-foreground">HD streaming, mobile hotspot, gaming</p>
                            </div>
                            <div className="p-2 bg-muted rounded">
                              <p className="font-medium">Unlimited</p>
                              <p className="text-xs text-muted-foreground">Work from anywhere, no WiFi access</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="device">
                        <AccordionTrigger>4. Device situation?</AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          <ScriptCard variant="primary">
                            <p>
                              &ldquo;Do you already have a phone you&apos;d like to bring with you, or are you
                              interested in getting a new device as well? What kind of phone do you currently
                              use?&rdquo;
                            </p>
                          </ScriptCard>
                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="p-3 border rounded-lg">
                              <p className="font-medium flex items-center gap-2">
                                <Smartphone className="h-4 w-4" />
                                Bringing Own Device (BYOD)
                              </p>
                              <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                                <li>• Check device compatibility</li>
                                <li>• Verify it&apos;s unlocked</li>
                                <li>• Lower monthly cost (no financing)</li>
                                <li>• BYOD exclusive plans available</li>
                              </ul>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <p className="font-medium flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Wants New Device
                              </p>
                              <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                                <li>• Device financing options</li>
                                <li>• {brand === "fido" ? "Fido Payment Program" : "Upfront Edge"}</li>
                                <li>• Trade-in programs available</li>
                                <li>• Latest models in stock</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="competitor">
                        <AccordionTrigger>5. Current provider?</AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          <ScriptCard variant="primary">
                            <p>
                              &ldquo;Who is your current provider, if you have one? And what made you start looking at{" "}
                              {brandName}? Understanding this helps me ensure we address any concerns.&rdquo;
                            </p>
                          </ScriptCard>
                          <div className="p-3 bg-muted rounded-lg text-sm">
                            <p className="font-medium mb-2">Common reasons for switching:</p>
                            <ul className="text-muted-foreground space-y-1">
                              <li>
                                • <strong>Better price:</strong> Highlight our value and promotions
                              </li>
                              <li>
                                • <strong>Better coverage:</strong> Explain Rogers 5G network advantage
                              </li>
                              <li>
                                • <strong>Poor service:</strong> Emphasize our customer care commitment
                              </li>
                              <li>
                                • <strong>Device upgrade:</strong> Show financing options and deals
                              </li>
                              <li>
                                • <strong>Contract ending:</strong> Perfect timing for new offers
                              </li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scenarios" className="space-y-3">
                <div className="grid gap-4">
                  {/* Family BYOD Scenario */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        Family BYOD Scenario
                      </CardTitle>
                      <CardDescription>Like &quot;Mark&quot; - Family of 3+ with existing devices</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid sm:grid-cols-3 gap-3 text-sm">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-blue-800">Why are they calling?</p>
                          <ul className="text-blue-700 text-xs mt-1 space-y-1">
                            <li>• Inquiring about wireless plans</li>
                            <li>• Saw offers on website</li>
                            <li>• Shopping around for best deal</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-blue-800">Who are they?</p>
                          <ul className="text-blue-700 text-xs mt-1 space-y-1">
                            <li>• Family with multiple members</li>
                            <li>• Mix of adults and possibly teens</li>
                            <li>• Already have compatible devices</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-blue-800">How to help?</p>
                          <ul className="text-blue-700 text-xs mt-1 space-y-1">
                            <li>• Ask what package interests them</li>
                            <li>• Probe for individual needs</li>
                            <li>• Pitch best family package</li>
                            <li>• Explain self-serve options</li>
                          </ul>
                        </div>
                      </div>

                      <ScriptCard variant="success">
                        <p className="font-medium mb-2">Recommended Pitch for Family BYOD:</p>
                        <p>
                          &ldquo;Based on what you&apos;ve told me about your family&apos;s needs, I&apos;d recommend
                          our {brand === "fido" ? "50GB" : "60GB"}
                          BYOD plan at ${brand === "fido" ? "40" : "45"}/line with Auto Pay. For {customerName}&apos;s
                          family of [X], that comes to $[total]/month total. Each person gets their own data, and since
                          you&apos;re bringing your own devices, there&apos;s no device financing to worry about. Plus,
                          you&apos;ll be on Canada&apos;s most reliable 5G network. Would you like me to get this set up
                          for you today?&rdquo;
                        </p>
                      </ScriptCard>
                    </CardContent>
                  </Card>

                  {/* Single User New Device */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-purple-600" />
                        Single User - Wants New Device
                      </CardTitle>
                      <CardDescription>Customer looking for phone + plan bundle</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <ScriptCard variant="primary">
                        <p>
                          &ldquo;Great choice looking at a new device! Our{" "}
                          {brand === "fido" ? "Fido Payment Program" : "Upfront Edge"} lets you spread out the cost of
                          your phone over 24 months with 0% interest. What kind of phone were you thinking about - are
                          you an iPhone person or Android?&rdquo;
                        </p>
                      </ScriptCard>
                      <div className="p-3 bg-muted rounded-lg text-sm">
                        <p className="font-medium mb-2">Key selling points:</p>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Latest iPhone and Samsung Galaxy models available</li>
                          <li>• 0% financing on device payments</li>
                          <li>• Trade-in credit for old device</li>
                          <li>• Free eSIM activation</li>
                          <li>• Device protection options available</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Student/Young Adult */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Gift className="h-4 w-4 text-orange-600" />
                        Student / Young Adult
                      </CardTitle>
                      <CardDescription>Budget-conscious, high data needs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <ScriptCard variant="primary">
                        <p>
                          &ldquo;I have some great options that are perfect for students!{" "}
                          {brand === "fido" ? "Fido" : "Rogers"} has plans starting at just $
                          {brand === "fido" ? "29" : "34"}/month. Are you currently a student? We sometimes have special
                          back-to-school offers as well.&rdquo;
                        </p>
                      </ScriptCard>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">Remember to mention:</p>
                        <ul className="space-y-1">
                          <li>• Data overage protection (no surprise charges)</li>
                          <li>• {brand === "fido" ? "Fido XTRA" : "Rogers Mastercard"} rewards</li>
                          <li>• Easy online account management via app</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="byod" className="space-y-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">BYOD (Bring Your Own Device) Process</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-3">Step-by-Step BYOD Setup:</p>
                      <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                        <li>
                          <strong>Verify device compatibility:</strong> Check if their phone works on Rogers/Fido
                          network
                          <ul className="ml-6 mt-1 list-disc text-xs">
                            <li>Must support Canadian LTE/5G bands</li>
                            <li>Check IMEI if needed on {brand === "fido" ? "fido.ca" : "rogers.com"}/byod</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Confirm device is unlocked:</strong> If from another carrier, must be unlocked
                          <ul className="ml-6 mt-1 list-disc text-xs">
                            <li>Can test with a friend&apos;s SIM card</li>
                            <li>Contact previous carrier to unlock if needed</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Choose the right plan:</strong> BYOD plans are cheaper (no device cost)
                        </li>
                        <li>
                          <strong>SIM or eSIM:</strong> Ask customer preference
                          <ul className="ml-6 mt-1 list-disc text-xs">
                            <li>eSIM: Instant activation, no physical card</li>
                            <li>Physical SIM: Ships free or pickup in store</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Port number (if applicable):</strong> Need account # and PIN from old carrier
                        </li>
                        <li>
                          <strong>Set up Auto Pay:</strong> Save $5/month on most plans
                        </li>
                      </ol>
                    </div>

                    <ScriptCard variant="primary">
                      <p className="font-medium mb-2">BYOD Compatibility Check Script:</p>
                      <p>
                        &ldquo;Let me make sure your phone will work perfectly on our network. What&apos;s the make and
                        model of your device? And do you know if it&apos;s unlocked from your previous carrier?&rdquo;
                      </p>
                    </ScriptCard>

                    <Alert>
                      <ShieldCheck className="h-4 w-4" />
                      <AlertTitle>BYOD Advantages to Highlight</AlertTitle>
                      <AlertDescription>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>
                            • <strong>Lower monthly cost</strong> - No device financing on your bill
                          </li>
                          <li>
                            • <strong>No commitment</strong> - Month-to-month flexibility
                          </li>
                          <li>
                            • <strong>Keep your phone</strong> - All your data, apps, and settings stay
                          </li>
                          <li>
                            • <strong>Same great network</strong> - Full access to 5G and all features
                          </li>
                        </ul>
                      </AlertDescription>
                    </Alert>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium text-sm flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          Compatible Devices
                        </p>
                        <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                          <li>• iPhone 8 and newer</li>
                          <li>• Samsung Galaxy S9 and newer</li>
                          <li>• Google Pixel 3 and newer</li>
                          <li>• Most unlocked Android phones</li>
                        </ul>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium text-sm flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          May Have Issues
                        </p>
                        <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                          <li>• Carrier-locked phones</li>
                          <li>• Very old models (pre-4G LTE)</li>
                          <li>• Some international variants</li>
                          <li>• CDMA-only devices</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="selfserve" className="space-y-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Self-Serve Registration Guide</CardTitle>
                    <CardDescription>Help customers set up online account management</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ScriptCard variant="success">
                      <p className="font-medium mb-2">After activation, explain self-serve:</p>
                      <p>
                        &ldquo;Now that your account is set up, let me quickly tell you about our self-serve options.
                        You can manage almost everything through our {brand === "fido" ? "My Fido" : "MyRogers"} app or
                        at {brand === "fido" ? "fido.ca/myaccount" : "rogers.com/myrogers"}. Would you like me to walk
                        you through the registration?&rdquo;
                      </p>
                    </ScriptCard>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-3">
                        {brand === "fido" ? "My Fido" : "MyRogers"} App & Website Registration:
                      </p>
                      <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                        <li>
                          Download <strong>{brand === "fido" ? "My Fido" : "MyRogers"}</strong> app from App Store /
                          Google Play
                        </li>
                        <li>Click &quot;Register&quot; or &quot;Create Account&quot;</li>
                        <li>Enter the phone number we just activated</li>
                        <li>Verify with the code sent via SMS</li>
                        <li>Create a password</li>
                        <li>Set up security questions for account recovery</li>
                      </ol>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium text-sm">What they can do online:</p>
                        <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                          <li>• View and pay bills</li>
                          <li>• Check real-time data usage</li>
                          <li>• Change plans</li>
                          <li>• Add/remove features</li>
                          <li>• Update contact info</li>
                          <li>• Set up Auto Pay</li>
                          <li>• Add travel passes</li>
                          <li>• Chat with support</li>
                        </ul>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium text-sm">Helpful to know:</p>
                        <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                          <li>• First bill in ~30 days</li>
                          <li>• E-bill is default (eco-friendly!)</li>
                          <li>• Push notifications for usage alerts</li>
                          <li>• 24/7 access to account</li>
                          <li>• {brand === "fido" ? "Fido XTRA" : "Rogers rewards"} program opt-in</li>
                        </ul>
                      </div>
                    </div>

                    {agentType === "cable" && (
                      <Alert className="border-blue-200 bg-blue-50">
                        <Home className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-800">Bundle Opportunity</AlertTitle>
                        <AlertDescription className="text-blue-700">
                          New wireless customers are great candidates for home internet bundles. Ask if they&apos;re
                          happy with their current internet provider!
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-4">
                <p className="text-sm font-medium text-green-800 mb-3">Final New Customer Checklist:</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-green-700">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Verified customer needs</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Recommended best plan</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Device situation confirmed</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Auto Pay explained ($5 savings)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Self-serve registration offered</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>First bill date communicated</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {selectedCategory === "billing" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing Inquiry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50">
              <FileText className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Use Bill Explainer Tool</AlertTitle>
              <AlertDescription className="text-blue-700">
                Navigate to Bill Explainer in your tools to walk through the customer&apos;s bill line by line.
              </AlertDescription>
            </Alert>

            <ScriptCard variant="primary">
              <p>
                &ldquo;I can see your account here, {customerName}. Let me review your recent billing details to help
                explain any charges you have questions about.&rdquo;
              </p>
            </ScriptCard>

            <Tabs defaultValue="common" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="common">Common Questions</TabsTrigger>
                <TabsTrigger value="charges">Charge Types</TabsTrigger>
                <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
              </TabsList>

              <TabsContent value="common" className="space-y-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="higher">
                    <AccordionTrigger>&ldquo;Why is my bill higher than usual?&rdquo;</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <ScriptCard variant="primary">
                        <p>
                          &ldquo;I understand that can be concerning. Let me look at what&apos;s different this month.
                          The most common reasons are...&rdquo;
                        </p>
                      </ScriptCard>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>
                          • <strong>Prorated charges</strong> - First bill or plan change mid-cycle
                        </li>
                        <li>
                          • <strong>One-time fees</strong> - Activation, device, setup fees
                        </li>
                        <li>
                          • <strong>Roaming charges</strong> - Travel without a roaming plan
                        </li>
                        <li>
                          • <strong>Data overages</strong> - Exceeded plan limits (if no overage protection)
                        </li>
                        <li>
                          • <strong>Add-on services</strong> - Features added during the cycle
                        </li>
                        <li>
                          • <strong>Promotion ended</strong> - Discount period expired
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="promo">
                    <AccordionTrigger>&ldquo;My promotional discount disappeared&rdquo;</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <ScriptCard variant="primary">
                        <p>
                          &ldquo;Let me check your promotions. I can see that your [X discount] was a [Y month]
                          promotional offer that has now ended. Let me see what current offers we have that could help
                          reduce your bill.&rdquo;
                        </p>
                      </ScriptCard>
                      <Alert>
                        <Gift className="h-4 w-4" />
                        <AlertDescription>
                          Check OneView for available retention offers if the customer is unhappy about the promo
                          ending.
                        </AlertDescription>
                      </Alert>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="payment">
                    <AccordionTrigger>&ldquo;I made a payment but it&apos;s not showing&rdquo;</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <ScriptCard variant="primary">
                        <p>
                          &ldquo;I understand how frustrating that can be. Let me check your payment history. When did
                          you make the payment, and what method did you use?&rdquo;
                        </p>
                      </ScriptCard>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium mb-1">Payment processing times:</p>
                        <ul className="space-y-1">
                          <li>• Credit/Debit card: 1-2 business days</li>
                          <li>• Bank transfer: 3-5 business days</li>
                          <li>• In-store payment: 24-48 hours</li>
                          <li>• Pre-authorized: Date of withdrawal</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="charges" className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Monthly Plan
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Base plan cost including data, talk, and text</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Device Financing
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Monthly device payment (Fido Payment Program / Upfront Edge)
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Prorated Charges
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Partial month charges when starting/changing service
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Roaming
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Usage outside Canada without a travel pass</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Add-ons
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Extra features like voicemail, call display, data packs
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Taxes & Fees
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">HST/GST, 911 fee, regulatory fees</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="adjustments" className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Adjustments Lobby (Maestro) Steps:</p>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Launch Maestro through ICM Launch Pad</li>
                    <li>Login using your LAN ID if required</li>
                    <li>Search for the customer account</li>
                    <li>Navigate to Adjustments Lobby</li>
                    <li>Select the appropriate adjustment module</li>
                    <li>Complete all required drop-down fields</li>
                    <li>Add detailed notes explaining the adjustment</li>
                    <li>Click Submit and copy notes into ICM</li>
                  </ol>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You can access up to 6 months of bill charges. Always document the reason for any adjustment.
                  </AlertDescription>
                </Alert>
                <ScriptCard variant="success">
                  <p>
                    &ldquo;{customerName}, I&apos;ve applied a credit of $[X] to your account. You&apos;ll see this
                    reflected on your next bill. Is there anything else I can help clarify?&rdquo;
                  </p>
                </ScriptCard>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {selectedCategory === "churn" && (
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-red-800">
              <AlertCircle className="h-4 w-4" />
              Churn Prevention - SAVE THE CUSTOMER
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="destructive">HIGH PRIORITY</Badge>
              <Badge variant="outline">Minimum 2 Offers Required</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Retention Protocol</AlertTitle>
              <AlertDescription>
                You MUST offer minimum 2 retention offers before processing any cancellation. Use OneView to find
                available offers. Disposition accurately - this is tracked.
              </AlertDescription>
            </Alert>

            <ScriptCard variant="warning">
              <p>
                &ldquo;I understand, {customerName}. Before we proceed, may I ask what&apos;s prompting you to consider
                leaving {brandName} today? I want to make sure I understand your situation fully.&rdquo;
              </p>
            </ScriptCard>

            <Tabs defaultValue="reasons" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reasons">Common Reasons</TabsTrigger>
                <TabsTrigger value="offers">Retention Offers</TabsTrigger>
                <TabsTrigger value="scripts">Save Scripts</TabsTrigger>
              </TabsList>

              <TabsContent value="reasons" className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-red-500" />
                      Price Too High
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Check for plan downgrades, discounts, or bundle savings
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      Competitor Offer
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Ask for details, check if we can match or beat</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <Signal className="h-4 w-4 text-red-500" />
                      Network/Service Issues
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Offer troubleshooting, escalate if needed</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <Users className="h-4 w-4 text-red-500" />
                      Moving/Relocation
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Check coverage at new location, offer pause</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-red-500" />
                      Bad Experience
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Apologize sincerely, offer credits, escalate</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4 text-red-500" />
                      No Longer Need Service
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Offer suspension or minimal plan option</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="offers" className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Check OneView for:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • <strong>Loyalty Discounts</strong> - Monthly bill credits (e.g., $10-20/month)
                    </li>
                    <li>
                      • <strong>Plan Credits</strong> - One-time account credits
                    </li>
                    <li>
                      • <strong>Free Data</strong> - Extra data at no charge
                    </li>
                    <li>
                      • <strong>Device Offers</strong> - Upgrade deals, waived fees
                    </li>
                    <li>
                      • <strong>Bundle Discounts</strong> - Savings for adding services
                    </li>
                  </ul>
                </div>

                <Alert className="border-amber-200 bg-amber-50">
                  <Gift className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">1MF Offer</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    Offer 1MF (One Month Free) on all Wireless Churn calls. Validate eligibility in 1source first.
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="scripts" className="space-y-3">
                <ScriptCard variant="success">
                  <p className="font-medium mb-2">Opening Save Script:</p>
                  <p>
                    &ldquo;I see that your account is selected for several loyalty offers, {customerName}. Before you
                    make a final decision, allow me to share some options that might change your mind. Can I take a few
                    minutes to tell you about them?&rdquo;
                  </p>
                </ScriptCard>

                <ScriptCard variant="primary">
                  <p className="font-medium mb-2">Price Concern Script:</p>
                  <p>
                    &ldquo;I completely understand that budget is important. I&apos;ve found an offer that can save you
                    $[X] per month, bringing your total down to $[Y]. That&apos;s [Z%] less than what you&apos;re paying
                    now, and you&apos;d keep all your current features. Would that work for you?&rdquo;
                  </p>
                </ScriptCard>

                <ScriptCard variant="primary">
                  <p className="font-medium mb-2">Competitor Match Script:</p>
                  <p>
                    &ldquo;I appreciate you sharing that information about [competitor]. Here&apos;s what I can offer
                    you to match that - [describe offer]. Plus, by staying with {brandName}, you won&apos;t have to deal
                    with switching hassles, porting your number, or learning a new system. What do you think?&rdquo;
                  </p>
                </ScriptCard>

                <ScriptCard variant="warning">
                  <p className="font-medium mb-2">Final Save Attempt:</p>
                  <p>
                    &ldquo;{customerName}, I really want to keep you as a valued customer. Let me make one final offer -
                    [best available offer]. This is the best I can do today. I hope you&apos;ll give us another
                    chance.&rdquo;
                  </p>
                </ScriptCard>
              </TabsContent>
            </Tabs>

            <div className="p-4 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
              <p className="text-sm font-medium text-red-800 mb-2">If Customer Still Wants to Cancel:</p>
              <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
                <li>Confirm they understand any early cancellation fees</li>
                <li>Explain device balance owing (if applicable)</li>
                <li>Offer to schedule cancellation for end of billing cycle</li>
                <li>Process the cancellation request professionally</li>
                <li>Disposition accurately in OneView</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedCategory === "technical" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Technical Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScriptCard variant="primary">
              <p>
                &ldquo;I&apos;m sorry to hear you&apos;re experiencing technical difficulties, {customerName}. Let me
                help troubleshoot this with you. Can you describe what&apos;s happening?&rdquo;
              </p>
            </ScriptCard>

            <Tabs defaultValue="wireless" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="wireless">Wireless Issues</TabsTrigger>
                {agentType === "cable" && <TabsTrigger value="cable">Cable/Internet</TabsTrigger>}
              </TabsList>

              <TabsContent value="wireless" className="space-y-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="no-service">
                    <AccordionTrigger>No Service / Signal Issues</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="text-sm space-y-2">
                        <p className="font-medium">Troubleshooting Steps:</p>
                        <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                          <li>Toggle Airplane Mode on/off</li>
                          <li>Restart the device</li>
                          <li>Check for network outages in the area</li>
                          <li>Verify SIM card is properly seated</li>
                          <li>Reset network settings (Settings → General → Reset)</li>
                        </ol>
                      </div>
                      <ScriptCard variant="primary">
                        <p>
                          &ldquo;Let&apos;s try a quick reset. Can you turn on Airplane Mode, wait 10 seconds, and then
                          turn it off? This refreshes your connection to the network.&rdquo;
                        </p>
                      </ScriptCard>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="slow-data">
                    <AccordionTrigger>Slow Data / No Data</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="text-sm space-y-2">
                        <p className="font-medium">Check First:</p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Data usage - has customer hit their limit?</li>
                          <li>Data overage protection enabled?</li>
                          <li>Is mobile data turned on?</li>
                          <li>APN settings correct?</li>
                        </ul>
                      </div>
                      <ScriptCard variant="primary">
                        <p>
                          &ldquo;I can see your data usage here. You&apos;ve used [X]GB of your [Y]GB plan. Let me check
                          if there are any network issues in your area.&rdquo;
                        </p>
                      </ScriptCard>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="voicemail">
                    <AccordionTrigger>Voicemail Issues</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="text-sm space-y-2">
                        <p className="font-medium">Common Solutions:</p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Reset voicemail password</li>
                          <li>Re-provision voicemail on the account</li>
                          <li>Check voicemail feature is active</li>
                          <li>Verify correct voicemail number (*98 or hold 1)</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="sim">
                    <AccordionTrigger>SIM Card / eSIM Issues</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <ScriptCard variant="primary">
                        <p>
                          &ldquo;It sounds like there might be an issue with your SIM. Let me check if we need to
                          replace it or if we can re-provision it from here.&rdquo;
                        </p>
                      </ScriptCard>
                      <div className="text-sm text-muted-foreground">
                        <p>For eSIM: Can often be re-downloaded through device settings.</p>
                        <p>For physical SIM: May need replacement if damaged.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              {agentType === "cable" && (
                <TabsContent value="cable" className="space-y-3">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="internet">
                      <AccordionTrigger>Internet Not Working</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <div className="text-sm space-y-2">
                          <p className="font-medium">Troubleshooting Steps:</p>
                          <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                            <li>Check all cable connections</li>
                            <li>Power cycle modem (unplug 30 seconds)</li>
                            <li>Check for area outages</li>
                            <li>Test with direct ethernet connection</li>
                            <li>Reset modem to factory if needed</li>
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="wifi">
                      <AccordionTrigger>WiFi Issues</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <div className="text-sm space-y-2">
                          <p className="font-medium">Common Fixes:</p>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Change WiFi channel to reduce interference</li>
                            <li>Move router to central location</li>
                            <li>Separate 2.4GHz and 5GHz networks</li>
                            <li>Consider WiFi extender for large homes</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              )}
            </Tabs>

            <Alert>
              <Wrench className="h-4 w-4" />
              <AlertDescription>
                If troubleshooting doesn&apos;t resolve the issue, check for area outages or schedule a technician
                visit.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {selectedCategory === "roaming" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Roaming & Travel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScriptCard variant="primary">
              <p>
                &ldquo;I can help you with your travel plans, {customerName}. Where will you be traveling to and for how
                long?&rdquo;
              </p>
            </ScriptCard>

            <Tabs defaultValue="options" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="options">Roaming Options</TabsTrigger>
                <TabsTrigger value="rates">Rates & Passes</TabsTrigger>
                <TabsTrigger value="tips">Travel Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="options" className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium flex items-center gap-2">
                      <Plane className="h-4 w-4" />
                      {brand === "fido" ? "Fido Roam" : "Roam Like Home"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pay-per-day option. Use your plan in 200+ destinations.
                    </p>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <strong>USA:</strong> $14/day
                      </p>
                      <p>
                        <strong>International:</strong> $16/day
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Travel Passes
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Better value for longer trips. Pre-purchase and save.
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Best for 3+ days
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rates" className="space-y-3">
                <div className="p-4 bg-muted rounded-lg space-y-3">
                  <p className="text-sm font-medium">Travel Passes (Better Value):</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-background rounded">
                      <p className="font-medium">US 7-Day Pass</p>
                      <p className="text-muted-foreground">$35 (~$5/day)</p>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <p className="font-medium">US 15-Day Pass</p>
                      <p className="text-muted-foreground">$60 (~$4/day)</p>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <p className="font-medium">US 30-Day Pass</p>
                      <p className="text-muted-foreground">$70 (~$2.33/day)</p>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <p className="font-medium">International Pass</p>
                      <p className="text-muted-foreground">Varies by destination</p>
                    </div>
                  </div>
                </div>

                <ScriptCard variant="success">
                  <p>
                    &ldquo;For your [X day] trip to [destination], I&apos;d recommend the [Pass Name]. It&apos;ll only
                    cost you $[price] total, which works out to about $[daily] per day. Much better than the daily rate!
                    Would you like me to add that to your account?&rdquo;
                  </p>
                </ScriptCard>
              </TabsContent>

              <TabsContent value="tips" className="space-y-3">
                <div className="space-y-3">
                  <ScriptCard variant="primary">
                    <p className="font-medium mb-2">Pre-Travel Tips to Share:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Download maps and content before you leave</li>
                      <li>• Turn off automatic app updates while roaming</li>
                      <li>• Use WiFi when available to save data</li>
                      <li>• Check that roaming is enabled in device settings</li>
                      <li>• Save emergency contact numbers offline</li>
                    </ul>
                  </ScriptCard>

                  <Alert>
                    <Globe className="h-4 w-4" />
                    <AlertDescription>
                      Remind customers to add a travel pass BEFORE they leave - roaming charges start automatically when
                      they arrive at their destination.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {selectedCategory === "account" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Account Changes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScriptCard variant="primary">
              <p>
                &ldquo;I can help you update your account, {customerName}. What changes would you like to make
                today?&rdquo;
              </p>
            </ScriptCard>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <p className="font-medium text-sm">Update Address</p>
                <p className="text-xs text-muted-foreground">Change billing or service address</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <p className="font-medium text-sm">Change Plan</p>
                <p className="text-xs text-muted-foreground">Upgrade, downgrade, or switch plans</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <p className="font-medium text-sm">Add/Remove Features</p>
                <p className="text-xs text-muted-foreground">Modify add-ons and services</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <p className="font-medium text-sm">Update Payment Method</p>
                <p className="text-xs text-muted-foreground">Change credit card or banking info</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <p className="font-medium text-sm">Add a Line</p>
                <p className="text-xs text-muted-foreground">Add new phone to account</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <p className="font-medium text-sm">Transfer Ownership</p>
                <p className="text-xs text-muted-foreground">Change account holder</p>
              </div>
            </div>

            <Alert>
              <Settings className="h-4 w-4" />
              <AlertDescription>
                Some changes may require additional verification. Always confirm changes before finalizing.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {selectedCategory === "general" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              General Inquiry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScriptCard variant="primary">
              <p>&ldquo;I&apos;m happy to help, {customerName}. What questions do you have for me today?&rdquo;</p>
            </ScriptCard>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="coverage">
                <AccordionTrigger>Coverage Questions</AccordionTrigger>
                <AccordionContent>
                  <ScriptCard variant="primary">
                    <p>
                      &ldquo;You can check coverage for any area on our website at{" "}
                      {brand === "fido" ? "fido.ca" : "rogers.com"}/coverage. Would you like me to check a specific
                      address for you?&rdquo;
                    </p>
                  </ScriptCard>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="store">
                <AccordionTrigger>Store Locations</AccordionTrigger>
                <AccordionContent>
                  <ScriptCard variant="primary">
                    <p>
                      &ldquo;I can help you find the nearest {brandName} store. What area or postal code are you looking
                      for?&rdquo;
                    </p>
                  </ScriptCard>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="selfserve">
                <AccordionTrigger>Self-Serve Options</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>Customers can do the following online or via app:</p>
                    <ul className="list-disc list-inside">
                      <li>View and pay bills</li>
                      <li>Check data usage</li>
                      <li>Change plan</li>
                      <li>Add features</li>
                      <li>Update contact info</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}

      {selectedCategory && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Insulation Questions
            </CardTitle>
            <CardDescription>
              Ask at least ONE of these to protect the customer relationship and identify opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ScriptCard variant="success">
              <ul className="space-y-2 text-sm">
                <li>
                  &ldquo;I noticed you&apos;re not using [feature X] – would you like me to explain how it works?
                  It&apos;s included in your plan!&rdquo;
                </li>
                <li>&ldquo;On a scale of 1-10, how satisfied are you with the services you have with us?&rdquo;</li>
                <li>&ldquo;Your renewal is coming up in X months. Shall we secure a better rate today?&rdquo;</li>
                <li>
                  &ldquo;I see you&apos;ve been with us for [X years] - thank you! Are there any other services we could
                  help you with?&rdquo;
                </li>
                <li>&ldquo;Is there anything about your current service that could be improved?&rdquo;</li>
              </ul>
            </ScriptCard>

            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Happy, insulated customers say yes 4-5x more often to offers. Always resolve first, then offer!
              </AlertDescription>
            </Alert>

            <Button onClick={onNext} className="w-full" size="lg">
              Issue Resolved - Continue to Offers
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
