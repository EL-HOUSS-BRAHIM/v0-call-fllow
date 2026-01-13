"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScriptCard } from "@/components/script-card"
import { MessageSquare, Smile, Frown } from "lucide-react"

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Welcome Script
          </CardTitle>
          <CardDescription>Start the call with a warm welcome and get the customer&apos;s name</CardDescription>
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
            <ScriptCard variant="primary">
              <p>
                &ldquo;It&apos;s so nice to meet you <span className="font-bold text-primary">{customerName}</span>! How
                may I assist you today?&rdquo;
              </p>
            </ScriptCard>
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
          </CardHeader>
          <CardContent>
            <ScriptCard variant="success">
              <p>
                &ldquo;Okay Perfect! I am the right person to assist with that today. I understand your situation, and I
                will do my best to help you.&rdquo;
              </p>
            </ScriptCard>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Frown className="h-4 w-4 text-orange-600" />
              Less Positive Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScriptCard variant="warning">
              <p>
                &ldquo;I am sorry to hear that you&apos;re experiencing this – I understand your situation, and I will
                do my best to help you and resolve this.&rdquo;
              </p>
            </ScriptCard>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pro Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              The warmer and friendlier the welcome is, the easier the whole interaction will be.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Quick loyalty nod: &ldquo;I see you&apos;ve been with us since [year] - thank you for staying with
              us.&rdquo;
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Happy, insulated customers say yes 4-5x more often than unhappy ones.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!customerName}>
          Continue to Authentication
        </Button>
      </div>
    </div>
  )
}
