"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScriptCard } from "@/components/script-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageSquare, ThumbsUp, Star, AlertTriangle, Info } from "lucide-react"

interface SurveyStepProps {
  agentName: string
  brand: "rogers" | "fido"
  customerName: string
  onNext: () => void
}

export function SurveyStep({ agentName, brand, customerName, onNext }: SurveyStepProps) {
  const brandName = brand === "rogers" ? "Rogers" : "Fido"

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Survey & Feedback
          </CardTitle>
          <CardDescription>Inform customer about post-call survey and gather feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Survey Notification - Required on Every Call</AlertTitle>
            <AlertDescription className="text-blue-700">
              You must inform the customer that they may receive a survey after this call. This is a mandatory step in
              the call flow.
            </AlertDescription>
          </Alert>

          <ScriptCard variant="primary">
            <p>
              &ldquo;I would like to inform you that you may receive a survey pertaining to our discussion after this
              call. The first part is about me and our interaction today. Just a reminder my name is{" "}
              <span className="font-bold">{agentName}</span>. The second part is about{" "}
              <span className="font-bold">{brandName}</span> directly and we welcome any feedback you have.&rdquo;
            </p>
          </ScriptCard>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">What the Survey Covers:</p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="p-2 bg-background rounded">
                <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Agent Performance
                </p>
                <ul className="list-disc list-inside text-xs space-y-1">
                  <li>Quality of interaction</li>
                  <li>Helpfulness & courtesy</li>
                  <li>Problem resolution</li>
                  <li>Overall satisfaction</li>
                </ul>
              </div>
              <div className="p-2 bg-background rounded">
                <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Company Feedback
                </p>
                <ul className="list-disc list-inside text-xs space-y-1">
                  <li>Service quality</li>
                  <li>Company experience</li>
                  <li>Suggestions for improvement</li>
                  <li>Product feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Survey Tips & Expectations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="positive">
              <AccordionTrigger className="text-green-700">
                <span className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Keep Survey Positive
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-3">
                <p className="text-sm">
                  The customer is more likely to give positive survey feedback if the interaction went well and the
                  customer is satisfied. Complete resolution increases survey satisfaction.
                </p>
                <div className="p-3 bg-muted rounded text-sm">
                  <p className="font-medium mb-1">Pro Tips:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-xs">
                    <li>Be genuine and empathetic throughout the call</li>
                    <li>Take ownership of problems</li>
                    <li>Follow through on promises</li>
                    <li>Show that you care about the customer</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="timing">
              <AccordionTrigger>When Surveys are Sent</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <p className="text-sm">
                  Surveys are typically sent via email or SMS within 24 hours of the call. Some customers may receive
                  them immediately after the call ends.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rating">
              <AccordionTrigger>Survey Rating Scale</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="p-3 bg-muted rounded text-sm">
                  <p className="font-medium mb-2">Most surveys use a 5-star or CSAT (Customer Satisfaction) scale:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-600">★★★★★ (5)</span>
                      <span className="text-muted-foreground">Very satisfied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-600">★★★★☆ (4)</span>
                      <span className="text-muted-foreground">Satisfied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-amber-600">★★★☆☆ (3)</span>
                      <span className="text-muted-foreground">Neutral</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-orange-600">★★☆☆☆ (2)</span>
                      <span className="text-muted-foreground">Dissatisfied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-red-600">★☆☆☆☆ (1)</span>
                      <span className="text-muted-foreground">Very dissatisfied</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="nps">
              <AccordionTrigger>Net Promoter Score (NPS) Questions</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;On a scale of 0-10, how likely are you to recommend {brandName} to a friend or
                    colleague?&rdquo;
                  </p>
                </ScriptCard>
                <p className="text-sm text-muted-foreground">
                  Scores 9-10 = Promoters (loyal advocates), 7-8 = Passives (satisfied but not loyal), 0-6 = Detractors
                  (unhappy customers who may leave)
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Handling Negative Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert>
            <AlertDescription>
              If a customer mentions they're likely to give negative feedback on the survey, acknowledge their concerns
              immediately and try to resolve the issue before ending the call.
            </AlertDescription>
          </Alert>
          <ScriptCard variant="warning">
            <p>
              &ldquo;{customerName}, I hear your frustration. Before you go, let me make sure we've resolved everything
              to your satisfaction. Is there anything else I can do for you right now?&rdquo;
            </p>
          </ScriptCard>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} size="lg">
          Continue to Closing
        </Button>
      </div>
    </div>
  )
}
