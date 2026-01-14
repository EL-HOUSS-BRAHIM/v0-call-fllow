"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScriptCard } from "@/components/script-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, Shield, Lightbulb, AlertTriangle, TrendingUp, Users, Smile, MessageCircle } from "lucide-react"
import type { AgentType } from "@/app/page"

interface InsulateStepProps {
  agentName: string
  brand: "rogers" | "fido"
  customerName: string
  agentType: AgentType
  onNext: () => void
}

export function InsulateStep({ agentName, brand, customerName, agentType, onNext }: InsulateStepProps) {
  const [satisfactionLevel, setSatisfactionLevel] = useState<number | null>(null)
  const brandName = brand === "rogers" ? "Rogers" : "Fido"

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Resolve & Insulate
          </CardTitle>
          <CardDescription>
            Protect and strengthen the customer relationship to prevent churn and increase loyalty
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <Heart className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">This Is Where the Magic Happens</AlertTitle>
            <AlertDescription className="text-red-700">
              Happy, insulated customers say yes 4-5x more often than unhappy ones. This step determines call success.
            </AlertDescription>
          </Alert>

          <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
            <p className="text-sm font-medium mb-2">The #1 Most Important Part of the Entire Call</p>
            <p className="text-sm text-muted-foreground">
              Truly understand the customer&apos;s needs and concerns. If you don&apos;t truly understand, you
              can&apos;t truly protect and strengthen the relationship.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Satisfaction Assessment */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Smile className="h-4 w-4" />
            1. Assess Satisfaction Level
          </CardTitle>
          <CardDescription>Gauge how satisfied the customer is with their current service</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScriptCard variant="primary">
            <p>
              &ldquo;On a scale of 1-10, how satisfied are you with the services you have with us, {customerName}
              ?&rdquo;
            </p>
          </ScriptCard>

          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <Button
                key={rating}
                variant={satisfactionLevel === rating ? "default" : "outline"}
                className="h-12 font-bold"
                onClick={() => setSatisfactionLevel(rating)}
              >
                {rating}
              </Button>
            ))}
          </div>

          {satisfactionLevel && (
            <div className="p-3 bg-muted rounded-lg">
              {satisfactionLevel >= 8 ? (
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-700">High Satisfaction</p>
                    <p className="text-sm text-muted-foreground">
                      Customer is happy! Focus on turning relief into opportunity with relevant offers.
                    </p>
                  </div>
                </div>
              ) : satisfactionLevel >= 6 ? (
                <div className="flex items-start gap-2">
                  <MessageCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amber-700">Moderate Satisfaction</p>
                    <p className="text-sm text-muted-foreground">
                      Customer is okay but not excited. Ask what would make their experience better.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-700">Low Satisfaction - Churn Risk</p>
                    <p className="text-sm text-muted-foreground">
                      Customer is unhappy. Dig deeper into their concerns and try to resolve issues. Offer targeted
                      retention offers.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Discovery Questions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            2. Discovery & Deep Understanding
          </CardTitle>
          <CardDescription>Ask questions to understand the customer&apos;s true needs and pain points</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="general">
              <AccordionTrigger>General Discovery Questions</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <ScriptCard variant="primary">
                    <ul className="space-y-2">
                      <li>&ldquo;How are you using our services right now?&rdquo;</li>
                      <li>&ldquo;Are there any features you&apos;re not using that might be helpful?&rdquo;</li>
                      <li>&ldquo;I noticed you&apos;re not using [feature X] - is there a reason for that?&rdquo;</li>
                      <li>&ldquo;What would make our service even better for you?&rdquo;</li>
                      <li>&ldquo;Are there any pain points with your current setup?&rdquo;</li>
                    </ul>
                  </ScriptCard>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="churn">
              <AccordionTrigger className="text-orange-700">Churn Prevention Questions</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <Alert variant="destructive" className="mb-3">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>If Customer Mentions Cancellation</AlertTitle>
                  <AlertDescription>
                    Ask probing questions to understand the real reason. Many customers cite price but the real issue
                    may be different.
                  </AlertDescription>
                </Alert>
                <ScriptCard variant="warning">
                  <ul className="space-y-2">
                    <li>&ldquo;What would make you stay with us?&rdquo;</li>
                    <li>&ldquo;Is the main concern about pricing, service, or something else?&rdquo;</li>
                    <li>&ldquo;How long have you been thinking about this?&rdquo;</li>
                    <li>&ldquo;Is there a specific incident that prompted this decision?&rdquo;</li>
                    <li>&ldquo;What offers or changes would make a difference?&rdquo;</li>
                  </ul>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="loyalty">
              <AccordionTrigger className="text-green-700">Loyalty & Retention Questions</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <ScriptCard variant="success">
                  <ul className="space-y-2">
                    <li>&ldquo;What value do you get from being a {brandName} customer?&rdquo;</li>
                    <li>&ldquo;Your renewal is coming up in X months. Shall we secure a better rate today?&rdquo;</li>
                    <li>&ldquo;I see you&apos;ve been with us since [year] - what keeps you with us?&rdquo;</li>
                    <li>&ldquo;Are there any friends or family who could benefit from our services?&rdquo;</li>
                  </ul>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Proactive Solutions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" />
            3. Proactive Problem Prevention
          </CardTitle>
          <CardDescription>Remove future reasons to leave before they become issues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Primary Focus:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>Fix the issue 100% - Complete resolution is mandatory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Proactively remove future reasons to leave</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>Build a stronger relationship for long-term retention</span>
              </li>
            </ul>
          </div>

          <ScriptCard variant="success">
            <p>
              &ldquo;I noticed you&apos;re not using [feature X] that could really benefit you. Let me help you set that
              up so you get the full value from your service.&rdquo;
            </p>
          </ScriptCard>
        </CardContent>
      </Card>

      {/* Offer Strategy */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            4. Strategic Offer Presentation
          </CardTitle>
          <CardDescription>Present relevant offers based on customer needs, not push sales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>The Key Principle</AlertTitle>
            <AlertDescription>
              Only offer relevant, low-pressure upsells/cross-sells based on what you just learned. Frame as a benefit,
              never as a hard sell.
            </AlertDescription>
          </Alert>

          <ScriptCard variant="primary">
            <p>
              &ldquo;Most customers in your situation add [feature] and save $X per month — want me to add it to your
              account?&rdquo;
            </p>
          </ScriptCard>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="yes">
              <AccordionTrigger className="text-green-700">Customer Says YES</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p className="text-sm">
                    Excellent! Proceed with adding the feature or plan. Recap what you&apos;ve added and when it takes
                    effect.
                  </p>
                  <ScriptCard variant="success">
                    <p>
                      &ldquo;Perfect! I&apos;ve added [feature] to your account effective immediately. You&apos;ll see
                      this reflected on your next bill.&rdquo;
                    </p>
                  </ScriptCard>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="no">
              <AccordionTrigger>Customer Says NO - Add More Value</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    If they say no, provide additional context and value. Try one more time with a different angle.
                  </p>
                  <ScriptCard variant="warning">
                    <p>
                      &ldquo;I understand. Let me share why this is valuable - [mention specific benefit]. Would it help
                      if we started with a shorter trial?&rdquo;
                    </p>
                  </ScriptCard>
                  <p className="text-sm mt-3">
                    If they still decline → Accept gracefully, never push further. Move on to closing.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pro Tips for Insulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium text-sm mb-1 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Listen First
              </p>
              <p className="text-xs text-muted-foreground">
                Ask more questions than you answer. Understanding comes before solutions.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium text-sm mb-1 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Build Trust
              </p>
              <p className="text-xs text-muted-foreground">
                Show genuine care. Customers stay loyal to people they trust, not just companies.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium text-sm mb-1 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Anticipate Needs
              </p>
              <p className="text-xs text-muted-foreground">
                Think ahead. What problems might they face? How can you prevent them?
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium text-sm mb-1 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Follow Through
              </p>
              <p className="text-xs text-muted-foreground">
                If you promise something, deliver it. Consistency builds lasting relationships.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} size="lg">
          Continue to Survey
        </Button>
      </div>
    </div>
  )
}
