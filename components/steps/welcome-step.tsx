"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScriptCard } from "@/components/script-card"
import { MessageSquare, Smile, Frown, AlertTriangle, Heart, Lightbulb, Clock, UserCheck } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

interface WelcomeStepProps {
  agentName: string
  brand: "rogers" | "fido"
  customerName: string
  onCustomerNameChange: (name: string) => void
  onNext: () => void
}

export function WelcomeStep({ agentName, brand, customerName, onCustomerNameChange, onNext }: WelcomeStepProps) {
  const brandName = brand === "rogers" ? "Rogers" : "Fido"

  return (
    <div className="space-y-4">
      <Alert className="border-amber-200 bg-amber-50">
        <Clock className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Call Control Reminder</AlertTitle>
        <AlertDescription className="text-amber-700">
          Keep control of the call from start to finish. Guide the conversation with confidence and empathy.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Opening Script
          </CardTitle>
          <CardDescription>Start the call with a warm welcome - first impressions matter!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScriptCard variant="primary">
            <p>
              &ldquo;Hello, my name is <span className="font-bold text-primary">{agentName}</span> from{" "}
              <span className="font-bold text-primary">{brandName}</span>. Can I please have your first and last
              name?&rdquo;
            </p>
          </ScriptCard>

          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="Enter customer's name"
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
            />
          </div>

          {customerName && (
            <>
              <ScriptCard variant="primary">
                <p>
                  &ldquo;It&apos;s so nice to meet you <span className="font-bold text-primary">{customerName}</span>!
                  How may I assist you today?&rdquo;
                </p>
              </ScriptCard>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Alternative Greetings:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>&ldquo;Great to have you on the line today, {customerName}! What can I help you with?&rdquo;</li>
                  <li>
                    &ldquo;Welcome to {brandName}, {customerName}! I&apos;m here to help. What brings you in
                    today?&rdquo;
                  </li>
                  <li>
                    &ldquo;Hi {customerName}! Thanks for calling {brandName}. How can I make your day better?&rdquo;
                  </li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Smile className="h-4 w-4 text-green-600" />
              Positive Response
            </CardTitle>
            <Badge variant="secondary" className="w-fit">
              Customer is happy
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <ScriptCard variant="success">
              <p>
                &ldquo;Okay Perfect! I am the right person to assist with that today. I understand your situation, and I
                will do my best to help you.&rdquo;
              </p>
            </ScriptCard>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium">More options:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>&ldquo;I&apos;d be happy to help you with that.&rdquo;</li>
                <li>&ldquo;Great question! Let me get that sorted for you right away.&rdquo;</li>
                <li>&ldquo;You&apos;ve come to the right place! I can definitely assist with that.&rdquo;</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Frown className="h-4 w-4 text-orange-600" />
              Frustrated Customer
            </CardTitle>
            <Badge variant="secondary" className="w-fit">
              Customer is upset
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <ScriptCard variant="warning">
              <p>
                &ldquo;I am sorry to hear that you&apos;re experiencing this – I understand your situation, and I will
                do my best to help you and resolve this.&rdquo;
              </p>
            </ScriptCard>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium">Empathy statements:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>&ldquo;I completely understand your frustration. Let me fix this for you.&rdquo;</li>
                <li>&ldquo;I can see why that would be upsetting. I&apos;m here to make it right.&rdquo;</li>
                <li>&ldquo;I apologize for the inconvenience. Let&apos;s work together to resolve this.&rdquo;</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            Loyalty Recognition
          </CardTitle>
          <CardDescription>Check account tenure and acknowledge long-term customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ScriptCard variant="success">
            <ul className="space-y-2">
              <li>
                <strong>1-3 years:</strong> &ldquo;I see you&apos;ve been with us for [X] years - we really appreciate
                your loyalty!&rdquo;
              </li>
              <li>
                <strong>3-5 years:</strong> &ldquo;Wow, you&apos;ve been part of the {brandName} family for [X] years!
                Thank you for your continued trust in us.&rdquo;
              </li>
              <li>
                <strong>5+ years:</strong> &ldquo;I can see you&apos;ve been a valued customer since [year] -
                that&apos;s amazing! We truly appreciate your long-standing loyalty.&rdquo;
              </li>
            </ul>
          </ScriptCard>
          <Alert>
            <UserCheck className="h-4 w-4" />
            <AlertDescription>
              Check ICM for account start date. Recognizing tenure increases customer satisfaction and offer acceptance
              rates.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Handling Difficult Situations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="angry">
              <AccordionTrigger>Customer is Very Angry</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <ScriptCard variant="warning">
                  <p>
                    &ldquo;I can hear that you&apos;re really frustrated, and I want you to know that I&apos;m here to
                    help. Please give me a moment to review your account so I can understand exactly what
                    happened.&rdquo;
                  </p>
                </ScriptCard>
                <div className="text-sm space-y-2">
                  <p className="font-medium">Tips:</p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Let them vent - don&apos;t interrupt</li>
                    <li>Lower your voice tone slightly</li>
                    <li>Use their name frequently</li>
                    <li>Acknowledge their feelings before offering solutions</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="repeat">
              <AccordionTrigger>Customer Has Called Multiple Times</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <ScriptCard variant="warning">
                  <p>
                    &ldquo;I see you&apos;ve been in touch with us recently about this issue. I apologize that it
                    hasn&apos;t been resolved yet. Let me take full ownership and make sure we get this sorted out
                    today.&rdquo;
                  </p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="escalation">
              <AccordionTrigger>Customer Demands Supervisor</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;I understand you&apos;d like to speak with a supervisor. Before I transfer you, may I have
                    one opportunity to resolve this for you? I have full authority to help with most situations. If I
                    can&apos;t resolve it, I&apos;ll personally ensure you&apos;re connected to the right person.&rdquo;
                  </p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="language">
              <AccordionTrigger>Language Barrier</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;I want to make sure I understand you correctly. Would you prefer to speak in another
                    language? I can connect you with a representative who speaks [language].&rdquo;
                  </p>
                </ScriptCard>
                <p className="text-sm text-muted-foreground">
                  Use interpretation services if available. Speak slowly and clearly, avoid jargon.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            Pro Tips for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium text-sm mb-1">First 30 Seconds</p>
              <p className="text-xs text-muted-foreground">
                The warmer and friendlier the welcome is, the easier the whole interaction will be. Smile while you
                talk!
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium text-sm mb-1">Use Their Name</p>
              <p className="text-xs text-muted-foreground">
                Use the customer&apos;s name 2-3 times during the call. It builds rapport and shows you care.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium text-sm mb-1">Happy = Yes</p>
              <p className="text-xs text-muted-foreground">
                Happy, insulated customers say yes 4-5x more often than unhappy ones. Resolve first, then offer.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium text-sm mb-1">Take Notes</p>
              <p className="text-xs text-muted-foreground">
                Jot down key points while the customer speaks. This helps you provide accurate solutions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!customerName} size="lg">
          Continue to Authentication
        </Button>
      </div>
    </div>
  )
}
