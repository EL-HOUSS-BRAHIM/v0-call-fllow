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
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { AgentType } from "@/app/page"

interface ProblemResolutionStepProps {
  agentName: string
  brand: "rogers" | "fido"
  customerName: string
  agentType: AgentType
  onNext: () => void
}

const PROBLEM_CATEGORIES = [
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
            <AlertDescription>
              &ldquo;Thank you for confirming; I will take a few minutes to work on your request in silence, or would
              you be more comfortable with a musical hold?&rdquo;
            </AlertDescription>
          </Alert>
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
              <AlertTitle className="text-blue-800">Use Bill Explainer</AlertTitle>
              <AlertDescription className="text-blue-700">
                For billing inquiries, make sure to consult the &ldquo;Bill Explainer&rdquo; tool in your systems.
              </AlertDescription>
            </Alert>

            <ScriptCard variant="primary">
              <p>
                &ldquo;I can see your account here, {customerName}. Let me review your recent billing details to help
                explain any charges.&rdquo;
              </p>
            </ScriptCard>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="adjustments">
                <AccordionTrigger>Adjustments Lobby (Maestro)</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Use the Adjustments Lobby to apply credits or adjustments to the account:
                    </p>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>Launch through ICM Launch Pad</li>
                      <li>Login using your LAN ID if required</li>
                      <li>Search for the account</li>
                      <li>Select the appropriate adjustment module</li>
                      <li>Complete drop down fields and click Submit</li>
                      <li>Copy notes into ICM</li>
                    </ol>
                    <Badge variant="secondary">Access up to 6 months of bill charges</Badge>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="common">
                <AccordionTrigger>Common Billing Questions</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm space-y-2">
                    <li>
                      <strong>Prorated charges:</strong> Charges for partial month when plan changes
                    </li>
                    <li>
                      <strong>One-time charges:</strong> Setup fees, device payments, activation
                    </li>
                    <li>
                      <strong>Recurring charges:</strong> Monthly plan cost, add-ons, protection plans
                    </li>
                    <li>
                      <strong>Taxes:</strong> HST/GST applied to services
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}

      {selectedCategory === "churn" && (
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-red-800">
              <AlertCircle className="h-4 w-4" />
              Churn Prevention
            </CardTitle>
            <Badge variant="destructive">SAVE THE CUSTOMER</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Retention Required</AlertTitle>
              <AlertDescription>
                You must offer minimum 2 offers to avoid cancellation. Use OneView and Retention offers.
              </AlertDescription>
            </Alert>

            <ScriptCard variant="warning">
              <p>
                &ldquo;I understand, {customerName}. Before we proceed, may I ask what&apos;s prompting you to consider
                leaving {brandName} today?&rdquo;
              </p>
            </ScriptCard>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Churn Call Process:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Ask questions to detect reasons of cancellation</li>
                <li>Check OneView for available offers</li>
                <li>Present retention offers (minimum 2)</li>
                <li>Offer 1MF on all Wireless Churn calls (Validate in 1source)</li>
                <li>Disposition accurately in OneView</li>
              </ol>
            </div>

            <ScriptCard variant="success">
              <p>
                &ldquo;I see that your account is selected for several loyalty offers. Allow me to ask you a few
                questions to tell you about the offer that best suits your needs.&rdquo;
              </p>
            </ScriptCard>
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
                help troubleshoot this with you.&rdquo;
              </p>
            </ScriptCard>

            <Accordion type="single" collapsible>
              <AccordionItem value="wireless">
                <AccordionTrigger>Wireless Issues</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm space-y-2">
                    <li>Check network coverage in customer area</li>
                    <li>Verify SIM card status</li>
                    <li>Check for service outages</li>
                    <li>Reset network settings if needed</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              {agentType === "cable" && (
                <AccordionItem value="cable">
                  <AccordionTrigger>Cable/Internet Issues</AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-sm space-y-2">
                      <li>Check modem/gateway status</li>
                      <li>Verify WiFi connection</li>
                      <li>Check for area outages</li>
                      <li>Schedule technician if needed</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
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
                &ldquo;I can help you with your travel plans, {customerName}. Where will you be traveling to?&rdquo;
              </p>
            </ScriptCard>

            <div className="p-4 bg-muted rounded-lg space-y-3">
              <p className="text-sm font-medium">{brand === "fido" ? "Fido Roam" : "Roam Like Home"} Daily Rates:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-background rounded">
                  <p className="font-medium">USA</p>
                  <p className="text-muted-foreground">$16/day</p>
                </div>
                <div className="p-2 bg-background rounded">
                  <p className="font-medium">International</p>
                  <p className="text-muted-foreground">$18/day</p>
                </div>
              </div>
              <p className="text-sm font-medium mt-3">Travel Passes (Better Value):</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-background rounded">
                  <p className="font-medium">US 14-Day Pass</p>
                  <p className="text-muted-foreground">$60 (~$4.29/day)</p>
                </div>
                <div className="p-2 bg-background rounded">
                  <p className="font-medium">US 30-Day Pass</p>
                  <p className="text-muted-foreground">$70 (~$2.33/day)</p>
                </div>
              </div>
            </div>
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

            <div className="grid grid-cols-2 gap-2">
              <Badge variant="outline" className="justify-center py-2">
                Update Address
              </Badge>
              <Badge variant="outline" className="justify-center py-2">
                Change Plan
              </Badge>
              <Badge variant="outline" className="justify-center py-2">
                Add/Remove Features
              </Badge>
              <Badge variant="outline" className="justify-center py-2">
                Payment Method
              </Badge>
              <Badge variant="outline" className="justify-center py-2">
                Add a Line
              </Badge>
              <Badge variant="outline" className="justify-center py-2">
                Transfer Ownership
              </Badge>
            </div>
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
            <CardDescription>Ask at least ONE of these to protect the customer relationship</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ScriptCard variant="success">
              <ul className="space-y-2 text-sm">
                <li>
                  &ldquo;I noticed you&apos;re not using [feature X] – would you like me to explain how it works?&rdquo;
                </li>
                <li>&ldquo;On a scale of 1-10, how satisfied are you with the services you have with us?&rdquo;</li>
                <li>&ldquo;Your renewal is coming up in X months. Shall we secure a better rate today?&rdquo;</li>
              </ul>
            </ScriptCard>
            <Button onClick={onNext} className="w-full">
              Issue Resolved - Continue to Offers
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
