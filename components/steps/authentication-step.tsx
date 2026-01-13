"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScriptCard } from "@/components/script-card"
import { Shield, Fingerprint, Key, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AuthenticationStepProps {
  agentName: string
  brand: "rogers" | "fido"
  customerName: string
  onNext: () => void
}

export function AuthenticationStep({ agentName, brand, customerName, onNext }: AuthenticationStepProps) {
  const [authMethod, setAuthMethod] = useState<"voiceid" | "pin" | "security" | null>(null)
  const [pinResult, setPinResult] = useState<"success" | "failed" | null>(null)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Customer Authentication
          </CardTitle>
          <CardDescription>Verify the customer&apos;s identity before making any account changes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Always authenticate the customer by the authorization level. Check ICM for the required auth level.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-4">
            <Card
              className={`cursor-pointer transition-all ${authMethod === "voiceid" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
              onClick={() => setAuthMethod("voiceid")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Fingerprint className="h-4 w-4" />
                  Voice ID Enrolled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="mb-2">
                  Check if green - Consent received
                </Badge>
                <p className="text-sm text-muted-foreground">Customer has been authenticated by Voice ID</p>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all ${authMethod === "pin" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
              onClick={() => setAuthMethod("pin")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  PIN Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="mb-2">
                  Maestro Platform
                </Badge>
                <p className="text-sm text-muted-foreground">Verify customer PIN in Maestro</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {authMethod === "voiceid" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Voice ID Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScriptCard variant="primary">
              <p>&ldquo;{customerName}, I can see you&apos;ve been authenticated by Voice ID. Thank you!&rdquo;</p>
            </ScriptCard>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning Check</AlertTitle>
              <AlertDescription>
                If you see &ldquo;consent not received&rdquo; but Voice ID Authenticated - please get consent again.
                <br />
                If you see WARNING - STOP THE CALL - client needs further validation.
              </AlertDescription>
            </Alert>

            <Button onClick={onNext} className="w-full">
              Continue - Customer Authenticated
            </Button>
          </CardContent>
        </Card>
      )}

      {authMethod === "pin" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">PIN Verification Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScriptCard variant="primary">
              <p>
                &ldquo;{customerName}, for your security, I&apos;ll need to verify your account PIN. Can you please
                provide it now?&rdquo;
              </p>
            </ScriptCard>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Go to Maestro Platform:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Search for the customer account</li>
                <li>Enter the PIN provided by the customer</li>
                <li>Verify the result</li>
              </ol>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={pinResult === "success" ? "default" : "outline"}
                className="h-16"
                onClick={() => setPinResult("success")}
              >
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                PIN Correct
              </Button>
              <Button
                variant={pinResult === "failed" ? "default" : "outline"}
                className="h-16"
                onClick={() => setPinResult("failed")}
              >
                <XCircle className="h-5 w-5 mr-2 text-red-600" />
                PIN Failed
              </Button>
            </div>

            {pinResult === "success" && (
              <>
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Authentication Successful</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Customer has been verified. You may proceed with account changes.
                  </AlertDescription>
                </Alert>
                <Button onClick={onNext} className="w-full">
                  Continue - Customer Authenticated
                </Button>
              </>
            )}

            {pinResult === "failed" && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-orange-800">PIN Failed - Security Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ScriptCard variant="warning">
                    <p>
                      &ldquo;I wasn&apos;t able to verify that PIN. For your security, I&apos;ll need to ask you some
                      security questions.&rdquo;
                    </p>
                  </ScriptCard>
                  <p className="text-sm text-orange-700">
                    Proceed with manual authentication through security questions as per your authorization level
                    requirements.
                  </p>
                  <Button variant="outline" onClick={() => setAuthMethod("security")}>
                    Proceed to Security Questions
                  </Button>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      {authMethod === "security" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Security Questions Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Manual Authentication Required</AlertTitle>
              <AlertDescription>
                Ask security questions based on the authorization level required. Use ICM to verify answers.
              </AlertDescription>
            </Alert>

            <ScriptCard variant="primary">
              <p>
                &ldquo;{customerName}, I&apos;ll need to verify your identity with a few security questions. Can you
                please confirm...&rdquo;
              </p>
            </ScriptCard>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Common Security Questions:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Full name on the account</li>
                <li>Account address</li>
                <li>Last 4 digits of credit card on file</li>
                <li>Date of birth</li>
                <li>Email address on file</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg bg-background">
              <p className="text-sm font-medium mb-2">After Successful Authentication - Offer Voice ID or PIN Setup:</p>
              <ScriptCard variant="success">
                <p>
                  &ldquo;{customerName}, I would like to enroll you to Voice ID by capturing your voice with our Voice
                  ID system during the call and creating your voiceprint. The next time you call, we&apos;ll identify
                  you by your voice. Is that okay?&rdquo;
                </p>
              </ScriptCard>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Benefits of Voice ID:</strong> Voice ID provides a higher level of protection. It&apos;s a safe,
                fast and secure way for us to verify who you are anytime you call us.
              </p>
            </div>

            <Button onClick={onNext} className="w-full">
              Continue - Customer Authenticated
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
