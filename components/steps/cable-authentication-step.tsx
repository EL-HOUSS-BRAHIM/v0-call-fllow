"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Shield } from "lucide-react"

interface CableAuthenticationStepProps {
  onNext: () => void
  accountType: "consumer" | "business"
}

export function CableAuthenticationStep({ onNext, accountType }: CableAuthenticationStepProps) {
  const [selectedTab, setSelectedTab] = useState("voice-id")

  const voiceIdStatuses = [
    {
      status: "Voice ID Authenticated",
      visual: "Green checkmark with 'Validated'",
      action: "PROCEED - Verbally advise: 'Your account is authenticated by your voice. Let me help you today.'",
      color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    },
    {
      status: "Consent Not Received",
      visual: "Blue 'Caller Opted Out' screen",
      action:
        "REQUIRED - Perform MANUAL + MFA authentication. After resolution, direct customer to IVR for Voice ID consent.",
      color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    },
    {
      status: "Warning - Further Validation Required",
      visual: "Purple Warning screen",
      action: "STOP CALL IMMEDIATELY. Direct customer to Validation Team: Rogers 1-844-896-5217, Fido 1-844-896-5218",
      color: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    },
  ]

  const manualAuthProcess = [
    {
      step: 1,
      title: "Ask 3 Manual Verification Questions",
      details: [
        "✓ Company Name (for business)",
        "✓ Corporate Email Address",
        "✓ Postal Code",
        "✗ DO NOT USE: First/Last Name (not valid)",
      ],
      note: "Must ask minimum 3 questions from approved list",
    },
    {
      step: 2,
      title: "Complete Multi-Factor Authentication (MFA) or PIN",
      details: [
        "Create Salesforce Case and navigate to 'Verify Contact' tab",
        "Select correct account contact from dropdown (must have email)",
        "Click 'Generate Code' to send one-time passcode",
        "Email must be registered 30+ days (90-day grace for new accounts)",
        "Confirm MFA code with customer",
      ],
      note: "CRITICAL: Manual + MFA combo required. MFA ALONE or PIN ALONE is NOT sufficient.",
    },
    {
      step: 3,
      title: "Voice ID Enrollment (if not already enrolled)",
      description:
        "(CX Name) I would like to enroll you in Voice ID by capturing your voice with our system during this call, creating your voiceprint. Next time you call, we'll identify you by your voice. Is that okay?",
      note: "Proactive security enhancement. If declined, frame as 'higher level of protection' and 'fast, safe, secure.'",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Authentication & Security Protocol
          </CardTitle>
          <CardDescription>Multi-layered approach to customer verification and account security</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="voice-id">Voice ID Status</TabsTrigger>
              <TabsTrigger value="manual">Manual Authentication</TabsTrigger>
            </TabsList>

            <TabsContent value="voice-id" className="space-y-4 mt-4">
              <div className="space-y-3">
                {voiceIdStatuses.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded border ${item.color}`}>
                    <div className="flex items-start gap-3">
                      {item.status.includes("Authenticated") && !item.status.includes("Warning") ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : item.status.includes("Warning") ? (
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.status}</p>
                        <p className="text-xs text-muted-foreground mt-1">Visual: {item.visual}</p>
                        <p className="text-sm mt-2 font-medium text-foreground">{item.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                <Badge className="mb-2">Mandatory Security Rule</Badge>
                <p className="text-xs text-foreground">
                  Voice ID system status ALWAYS determines next action. Agent must follow the prescribed path for each
                  status. This is non-negotiable for compliance.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4 mt-4">
              {manualAuthProcess.map((section) => (
                <div key={section.step} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="flex-shrink-0 mt-0.5">
                      Step {section.step}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{section.title}</p>
                      {section.description && (
                        <p className="text-sm italic mt-2 bg-muted p-2 rounded">{section.description}</p>
                      )}
                      {section.details && (
                        <ul className="mt-2 space-y-1">
                          {section.details.map((detail, idx) => (
                            <li key={idx} className="text-xs text-foreground">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="text-xs text-muted-foreground mt-2 font-medium italic">⚠️ {section.note}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded border border-red-200 dark:border-red-800">
                <Badge className="mb-2">Critical Compliance Rule</Badge>
                <p className="text-xs text-foreground font-semibold">
                  "JUST MFA or JUST PIN is NOT proper authentication." You MUST use Manual Verification + MFA combo or
                  Manual Verification + PIN combo. This is mandatory for security and compliance.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Button onClick={onNext} className="w-full">
        Continue to Discovery
      </Button>
    </div>
  )
}
