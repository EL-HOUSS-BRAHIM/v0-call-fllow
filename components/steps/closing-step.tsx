"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScriptCard } from "@/components/script-card"
import {
  CheckCircle2,
  MessageSquare,
  ClipboardCheck,
  Star,
  ThumbsUp,
  AlertTriangle,
  RotateCcw,
  FileText,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ClosingStepProps {
  agentName: string
  brand: "rogers" | "fido"
  customerName: string
}

export function ClosingStep({ agentName, brand, customerName }: ClosingStepProps) {
  const [recap, setRecap] = useState("")
  const [checklist, setChecklist] = useState({
    agentAssist: false,
    oneView: false,
    offersPresented: false,
    rogersBank: false,
    accountNote: false,
    closeOneView: false,
  })
  const brandName = brand === "rogers" ? "Rogers" : "Fido"

  const allChecked = Object.values(checklist).every(Boolean)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Closing the Call
          </CardTitle>
          <CardDescription>Summarize, confirm satisfaction, and end on a positive note</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <ClipboardCheck className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Recap Required - Use the Word &ldquo;RECAP&rdquo;</AlertTitle>
            <AlertDescription className="text-blue-700">
              Say the word &ldquo;RECAP&rdquo; out loud so Agent Assist captures your interaction summary accurately.
              This is critical for documentation.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            1. Recap the Interaction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="general">
              <AccordionTrigger>General Service Recap</AccordionTrigger>
              <AccordionContent>
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;So, to <strong>RECAP</strong> our interaction today, {customerName}, we [describe what was
                    done]. This will take effect [timeframe]. Is there anything I missed or anything else you&apos;d
                    like to clarify?&rdquo;
                  </p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="planchange">
              <AccordionTrigger>Plan Change Recap</AccordionTrigger>
              <AccordionContent>
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;So, to <strong>RECAP</strong>, {customerName}, I&apos;ve changed your plan from [old plan] to
                    [new plan] at $[price] per month. This includes [key features]. The change will be effective
                    [immediately/next billing cycle]. You may see prorated charges on your next bill for the days
                    between now and your billing date.&rdquo;
                  </p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="hup">
              <AccordionTrigger>Hardware Upgrade Recap</AccordionTrigger>
              <AccordionContent>
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;So, to <strong>RECAP</strong> our time together today, {customerName}, we completed a
                    hardware upgrade to the [device name]. Your monthly device payment will be $[amount] for 24 months,
                    and I&apos;ve added device protection at $[amount]/month. You&apos;ll receive your new device by
                    [date] via [shipping method]. The tracking number will be sent to [email/phone]. Remember to back up
                    your old device before switching!&rdquo;
                  </p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="billing">
              <AccordionTrigger>Billing Inquiry Recap</AccordionTrigger>
              <AccordionContent>
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;So, to <strong>RECAP</strong>, {customerName}, we reviewed your bill and I explained the
                    [specific charge]. I&apos;ve also applied a credit of $[amount] to your account for [reason].
                    You&apos;ll see this reflected on your next bill. Your new balance is $[amount], due on
                    [date].&rdquo;
                  </p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="technical">
              <AccordionTrigger>Technical Support Recap</AccordionTrigger>
              <AccordionContent>
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;So, to <strong>RECAP</strong>, {customerName}, we troubleshot [issue description] and
                    [resolved it/scheduled follow-up]. [If resolved: Your service should now be working normally. Please
                    reach out if you experience any more issues.] [If follow-up: A technician will visit on [date]
                    between [time]. You&apos;ll receive a confirmation text with details.]&rdquo;
                  </p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your recap notes (for ICM):</label>
            <Textarea
              placeholder="Enter your recap summary here. Be specific about what was discussed and any changes made..."
              value={recap}
              onChange={(e) => setRecap(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Tip: Copy Agent Assist&apos;s summarization into ICM notes. Do not add personal commentary or edit the AI
              summary.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            2. Confirm & Offer Additional Help
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScriptCard variant="primary">
            <p>&ldquo;Just to confirm, {customerName}, [brief summary of resolution]. Is that all correct?&rdquo;</p>
          </ScriptCard>

          <ScriptCard variant="success">
            <p>&ldquo;Is there anything else I can help you with today before we wrap up?&rdquo;</p>
          </ScriptCard>

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">If Customer Has Another Question:</p>
            <p className="text-sm text-muted-foreground">
              &ldquo;I&apos;m happy to help with that too. Let me...&rdquo;
            </p>
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">If Customer Says No:</p>
            <p className="text-sm text-muted-foreground">
              &ldquo;Perfect! Then let me just tell you about our survey before we go...&rdquo;
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            3. Survey Reminder
          </CardTitle>
          <CardDescription>Explain the survey to set expectations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScriptCard variant="warning">
            <p>
              &ldquo;{customerName}, you may receive a short survey after this call about your experience today. It has
              two parts:
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <strong>Part 1:</strong> About me and our interaction - my name is <strong>{agentName}</strong>
              </li>
              <li>
                <strong>Part 2:</strong> About {brandName} as a company - your feedback helps us improve
              </li>
            </ul>
            <p className="mt-2">
              We truly value your feedback, and I hope I&apos;ve earned a positive review today!&rdquo;
            </p>
          </ScriptCard>

          <Alert>
            <Star className="h-4 w-4" />
            <AlertDescription>
              Remember: High survey scores impact your performance metrics. Resolving issues fully and providing great
              service is the best way to earn good reviews.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-green-600" />
            4. Closing Statement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScriptCard variant="success">
            <p className="font-medium mb-2">Standard Closing:</p>
            <p>
              &ldquo;Once again, {customerName}, my name is <strong>{agentName}</strong>. It was a pleasure to assist
              you today. Thank you for being a part of the {brandName} family. Have a wonderful day!&rdquo;
            </p>
          </ScriptCard>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="seasonal">
              <AccordionTrigger>Seasonal/Holiday Closings</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <ScriptCard variant="primary">
                  <p>&ldquo;...and have a wonderful holiday season!&rdquo;</p>
                </ScriptCard>
                <ScriptCard variant="primary">
                  <p>&ldquo;...enjoy your weekend!&rdquo;</p>
                </ScriptCard>
                <ScriptCard variant="primary">
                  <p>&ldquo;...stay warm/cool out there!&rdquo;</p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="travel">
              <AccordionTrigger>Travel-Related Closing</AccordionTrigger>
              <AccordionContent>
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;...and have a fantastic trip to [destination]! Don&apos;t forget to activate your travel pass
                    when you arrive!&rdquo;
                  </p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="newcustomer">
              <AccordionTrigger>New Customer Closing</AccordionTrigger>
              <AccordionContent>
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;Welcome to the {brandName} family, {customerName}! We&apos;re so happy to have you. If you
                    have any questions as you get set up, don&apos;t hesitate to reach out. Have a great day!&rdquo;
                  </p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="difficult">
              <AccordionTrigger>After Difficult Call Closing</AccordionTrigger>
              <AccordionContent>
                <ScriptCard variant="primary">
                  <p>
                    &ldquo;{customerName}, I really appreciate your patience while we worked through this. I hope I was
                    able to resolve everything to your satisfaction. Please don&apos;t hesitate to call back if you need
                    anything else. Take care!&rdquo;
                  </p>
                </ScriptCard>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-green-800">
            <CheckCircle2 className="h-4 w-4" />
            Post-Call Checklist
          </CardTitle>
          <CardDescription className="text-green-700">Complete all items before taking the next call</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="agentAssist"
                checked={checklist.agentAssist}
                onCheckedChange={(checked) => setChecklist((prev) => ({ ...prev, agentAssist: checked as boolean }))}
              />
              <label htmlFor="agentAssist" className="text-sm cursor-pointer">
                Agent Assist summary copied to ICM
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="oneView"
                checked={checklist.oneView}
                onCheckedChange={(checked) => setChecklist((prev) => ({ ...prev, oneView: checked as boolean }))}
              />
              <label htmlFor="oneView" className="text-sm cursor-pointer">
                OneView dispositioned correctly (call type, outcome)
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="offersPresented"
                checked={checklist.offersPresented}
                onCheckedChange={(checked) =>
                  setChecklist((prev) => ({ ...prev, offersPresented: checked as boolean }))
                }
              />
              <label htmlFor="offersPresented" className="text-sm cursor-pointer">
                All offers presented and recorded
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="rogersBank"
                checked={checklist.rogersBank}
                onCheckedChange={(checked) => setChecklist((prev) => ({ ...prev, rogersBank: checked as boolean }))}
              />
              <label htmlFor="rogersBank" className="text-sm cursor-pointer">
                Rogers Bank offer made (acceptance/refusal noted)
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="accountNote"
                checked={checklist.accountNote}
                onCheckedChange={(checked) => setChecklist((prev) => ({ ...prev, accountNote: checked as boolean }))}
              />
              <label htmlFor="accountNote" className="text-sm cursor-pointer">
                Note left in customer account
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="closeOneView"
                checked={checklist.closeOneView}
                onCheckedChange={(checked) => setChecklist((prev) => ({ ...prev, closeOneView: checked as boolean }))}
              />
              <label htmlFor="closeOneView" className="text-sm cursor-pointer">
                OneView closed
              </label>
            </div>
          </div>

          {allChecked && (
            <Alert className="mt-4 border-green-300 bg-green-100">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 font-medium">
                Great job! All items completed. You&apos;re ready for the next call.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">Customer Mistreatment Warning</AlertTitle>
        <AlertDescription className="text-red-700">
          The following are flagged by AI and considered customer mistreatment:
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Excessive hold times without checking in</li>
            <li>• Invalid or blind transfers</li>
            <li>• Dropped calls without callback attempt</li>
            <li>• Incomplete authentication</li>
            <li>• Not resolving the customer&apos;s issue</li>
          </ul>
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="pt-6">
          <Button className="w-full h-14 text-lg" variant="default" onClick={() => window.location.reload()}>
            <RotateCcw className="h-5 w-5 mr-2" />
            Start New Call
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            This will reset the call flow for your next customer
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
