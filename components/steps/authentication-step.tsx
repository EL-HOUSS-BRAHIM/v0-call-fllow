"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScriptCard } from "@/components/script-card"
import {
  Shield,
  Fingerprint,
  Key,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface AuthenticationStepProps {
  agentName: string
  brand: "rogers" | "fido"
  customerName: string
  onNext: () => void
}

export function AuthenticationStep({ agentName, brand, customerName, onNext }: AuthenticationStepProps) {
  const [authMethod, setAuthMethod] = useState<"voiceid" | "pin" | "security" | null>(null)
  const [pinResult, setPinResult] = useState<"success" | "failed" | null>(null)
  const [showAuthLevels, setShowAuthLevels] = useState(false)
  const brandName = brand === "rogers" ? "Rogers" : "Fido"

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
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Security First!</AlertTitle>
            <AlertDescription>
              Always authenticate the customer by the authorization level required in ICM. Never skip authentication -
              it protects both the customer and you.
            </AlertDescription>
          </Alert>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="font-medium">Authorization Levels</p>
              <Button variant="ghost" size="sm" onClick={() => setShowAuthLevels(!showAuthLevels)}>
                {showAuthLevels ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showAuthLevels ? "Hide" : "Show"}
              </Button>
            </div>
            {showAuthLevels && (
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-background rounded">
                  <Badge variant="outline" className="mb-1">
                    Level 0
                  </Badge>
                  <p className="text-muted-foreground">General inquiries, no account access</p>
                </div>
                <div className="p-2 bg-background rounded">
                  <Badge variant="outline" className="mb-1">
                    Level 1
                  </Badge>
                  <p className="text-muted-foreground">View account, basic info changes</p>
                </div>
                <div className="p-2 bg-background rounded">
                  <Badge variant="outline" className="mb-1">
                    Level 2
                  </Badge>
                  <p className="text-muted-foreground">Plan changes, feature modifications</p>
                </div>
                <div className="p-2 bg-background rounded">
                  <Badge variant="destructive" className="mb-1">
                    Level 3
                  </Badge>
                  <p className="text-muted-foreground">Financial transactions, PIN reset</p>
                </div>
              </div>
            )}
          </div>

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
                <p className="text-sm text-muted-foreground">Customer has been authenticated by Voice ID biometrics</p>
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
                <p className="text-sm text-muted-foreground">Verify customer&apos;s 4-digit account PIN</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {authMethod === "voiceid" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Fingerprint className="h-4 w-4" />
              Voice ID Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScriptCard variant="primary">
              <p>&ldquo;{customerName}, I can see you&apos;ve been authenticated by Voice ID. Thank you!&rdquo;</p>
            </ScriptCard>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="green">
                <AccordionTrigger className="text-green-700">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Green - Verified & Consent Received
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      Customer is fully authenticated. You may proceed with all authorized transactions.
                    </p>
                    <ScriptCard variant="success">
                      <p>&ldquo;Perfect! Your voice has been verified. How can I help you today?&rdquo;</p>
                    </ScriptCard>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="yellow">
                <AccordionTrigger className="text-amber-700">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Yellow - Verified but No Consent
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="text-sm">Voice ID matched but consent not on file. You must get consent again.</p>
                    <ScriptCard variant="warning">
                      <p>
                        &ldquo;{customerName}, I see your voice has been verified, but I need to confirm your consent to
                        use Voice ID for future calls. Do I have your permission to use your voiceprint for
                        authentication?&rdquo;
                      </p>
                    </ScriptCard>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="red">
                <AccordionTrigger className="text-red-700">
                  <span className="flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    Red - WARNING - Fraud Alert
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>STOP - Do Not Proceed</AlertTitle>
                    <AlertDescription>
                      Voice ID has flagged this call. The customer needs further validation. Follow fraud prevention
                      protocols.
                    </AlertDescription>
                  </Alert>
                  <ScriptCard variant="warning">
                    <p>
                      &ldquo;{customerName}, for your security, I need to verify some additional information. Can you
                      please confirm...&rdquo;
                    </p>
                  </ScriptCard>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button onClick={onNext} className="w-full">
              Continue - Customer Authenticated
            </Button>
          </CardContent>
        </Card>
      )}

      {authMethod === "pin" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="h-4 w-4" />
              PIN Verification Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScriptCard variant="primary">
              <p>
                &ldquo;{customerName}, for your security, I&apos;ll need to verify your account PIN. Can you please
                provide your 4-digit PIN now?&rdquo;
              </p>
            </ScriptCard>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-3">Maestro PIN Verification Steps:</p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Open Maestro from ICM Launch Pad</li>
                <li>Search for the customer account using phone number or account number</li>
                <li>Navigate to the PIN verification section</li>
                <li>Enter the PIN provided by the customer</li>
                <li>Click &ldquo;Verify&rdquo; and check the result</li>
              </ol>
              <Alert className="mt-3">
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  Never ask the customer to repeat their PIN out loud. If unclear, ask them to enter it again.
                </AlertDescription>
              </Alert>
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
                    Customer has been verified. You may proceed with account changes based on the authorization level.
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
                  <CardTitle className="text-base text-orange-800">PIN Failed - Security Questions Required</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ScriptCard variant="warning">
                    <p>
                      &ldquo;I wasn&apos;t able to verify that PIN. No worries - for your security, I&apos;ll need to
                      ask you some security questions instead.&rdquo;
                    </p>
                  </ScriptCard>
                  <p className="text-sm text-orange-700">
                    After 3 failed PIN attempts, the account may be locked. Proceed to security questions.
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
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Security Questions Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Manual Authentication Required</AlertTitle>
              <AlertDescription>
                Ask security questions based on the authorization level required. Verify all answers in ICM.
              </AlertDescription>
            </Alert>

            <ScriptCard variant="primary">
              <p>
                &ldquo;{customerName}, I&apos;ll need to verify your identity with a few security questions. Please
                answer these to the best of your ability.&rdquo;
              </p>
            </ScriptCard>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-3">Security Questions by Level:</p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="level1">
                  <AccordionTrigger>Level 1 - Basic Verification</AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>
                        <strong>Full name</strong> on the account
                      </li>
                      <li>
                        <strong>Account address</strong> (street, city, postal code)
                      </li>
                      <li>
                        <strong>Email address</strong> on file
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="level2">
                  <AccordionTrigger>Level 2 - Enhanced Verification</AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>All Level 1 questions PLUS:</li>
                      <li>
                        <strong>Date of birth</strong>
                      </li>
                      <li>
                        <strong>Last 4 digits</strong> of credit card on file
                      </li>
                      <li>
                        <strong>Phone number(s)</strong> on the account
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="level3">
                  <AccordionTrigger>Level 3 - Full Verification</AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>All Level 1 & 2 questions PLUS:</li>
                      <li>
                        <strong>Account number</strong>
                      </li>
                      <li>
                        <strong>Recent payment amount</strong> or date
                      </li>
                      <li>
                        <strong>IMEI</strong> of device on account
                      </li>
                      <li>
                        <strong>Security question answer</strong> (if set up)
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="p-4 border rounded-lg bg-background">
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                After Successful Authentication - Offer Voice ID Enrollment:
              </p>
              <ScriptCard variant="success">
                <p>
                  &ldquo;{customerName}, I would like to enroll you in Voice ID by capturing your voice during this call
                  and creating your voiceprint. The next time you call, we&apos;ll identify you by your voice
                  automatically. It&apos;s safe, fast, and secure. Would you like to enroll?&rdquo;
                </p>
              </ScriptCard>
              <div className="mt-3 p-3 bg-muted rounded">
                <p className="text-sm font-medium mb-1">Voice ID Benefits to Mention:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Faster authentication on future calls</li>
                  <li>• Higher level of protection against fraud</li>
                  <li>• No need to remember PIN or answer questions</li>
                  <li>• Unique voiceprint - cannot be replicated</li>
                </ul>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-background">
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Key className="h-4 w-4" />
                Or Offer to Set Up a New PIN:
              </p>
              <ScriptCard variant="primary">
                <p>
                  &ldquo;{customerName}, would you like to set up a new 4-digit PIN for your account? This will make
                  future calls faster and more secure.&rdquo;
                </p>
              </ScriptCard>
            </div>

            <Button onClick={onNext} className="w-full">
              Continue - Customer Authenticated
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Authentication Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium mb-1">Don&apos;t Rush</p>
              <p className="text-muted-foreground text-xs">
                Take your time with authentication. It protects the customer and prevents fraud.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium mb-1">Be Patient</p>
              <p className="text-muted-foreground text-xs">
                If the customer struggles with questions, offer alternatives calmly.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium mb-1">Document Everything</p>
              <p className="text-muted-foreground text-xs">
                Note the authentication method used in ICM for compliance.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium mb-1">Trust Your Instincts</p>
              <p className="text-muted-foreground text-xs">
                If something feels off, escalate to fraud prevention team.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
