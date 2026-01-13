"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScriptCard } from "@/components/script-card"
import { CheckCircle2, MessageSquare, ClipboardCheck, Star, ThumbsUp } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ClosingStepProps {
  agentName: string
  brand: "rogers" | "fido"
  customerName: string
}

export function ClosingStep({ agentName, brand, customerName }: ClosingStepProps) {
  const [recap, setRecap] = useState("")
  const brandName = brand === "rogers" ? "Rogers" : "Fido"

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
            <AlertTitle className="text-blue-800">Recap Required</AlertTitle>
            <AlertDescription className="text-blue-700">
              Use the word &ldquo;RECAP&rdquo; to ensure Agent Assist captures your interaction accurately.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">1. Recap the Interaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScriptCard variant="primary">
            <p>
              &ldquo;So, to <strong>recap</strong> our interaction today, we proceeded with [X Transaction] at [Y
              Price], which will include a [Z Discount] effective on your next billing cycle.&rdquo;
            </p>
          </ScriptCard>

          <p className="text-sm text-muted-foreground">Alternative for hardware upgrade:</p>

          <ScriptCard variant="primary">
            <p>
              &ldquo;So, to <strong>recap</strong> our time together today, we completed a hardware upgrade at [X Price]
              which will include [Y discounts and Z fees]. You will receive your new device on [Date] and the changes we
              discussed will take effect on your next billing cycle.&rdquo;
            </p>
          </ScriptCard>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your recap notes:</label>
            <Textarea
              placeholder="Enter your recap summary here..."
              value={recap}
              onChange={(e) => setRecap(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Tip: Copy and paste Agent Assist summarization into ICM notes. Do not edit or add personal notes.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">2. Confirm & Offer Additional Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScriptCard variant="primary">
            <p>&ldquo;Just to confirm, {customerName}, we [summary of what was done]. Is that correct?&rdquo;</p>
          </ScriptCard>

          <ScriptCard variant="success">
            <p>&ldquo;Is there anything else I can help you with today?&rdquo;</p>
          </ScriptCard>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            3. Survey Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScriptCard variant="warning">
            <p>
              &ldquo;I would like to inform you that you may receive a survey pertaining to our discussion after this
              call. The first part is about me and our interaction today. Just a reminder, my name is{" "}
              <strong>{agentName}</strong>. The second part is about {brandName} directly and we welcome any feedback
              you have.&rdquo;
            </p>
          </ScriptCard>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-green-600" />
            4. Closing Statement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScriptCard variant="success">
            <p>
              &ldquo;Once again, <strong>{customerName}</strong>, my name is <strong>{agentName}</strong>. It was a
              pleasure to assist you today. Thank you for being a part of the {brandName} family. Have a great
              day!&rdquo;
            </p>
          </ScriptCard>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-green-800">
            <CheckCircle2 className="h-4 w-4" />
            Post-Call Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Agent Assist summary copied to ICM</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>OneView dispositioned correctly</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>All offers presented and recorded</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Rogers Bank offered</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Leave a note in the account</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Close OneView</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-red-200 bg-red-50">
        <MessageSquare className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">Reminder</AlertTitle>
        <AlertDescription className="text-red-700">
          Excessive hold times, invalid transfers, and dropped calls without callback are considered customer
          mistreatment. Rogers uses AI to recognize these instances.
        </AlertDescription>
      </Alert>
    </div>
  )
}
