"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Phone, Wifi, AlertCircle } from "lucide-react"
import type { AgentInfo, AgentType } from "@/app/page"

interface AgentSetupProps {
  onComplete: (info: AgentInfo) => void
}

const VALID_PIN = "1234" // Simple PIN for demo - you can change this

export function AgentSetup({ onComplete }: AgentSetupProps) {
  const [step, setStep] = useState<"pin" | "name" | "type">("pin")
  const [pin, setPin] = useState("")
  const [name, setName] = useState("")
  const [pinError, setPinError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const MAX_ATTEMPTS = 3

  const handlePinSubmit = () => {
    if (pin === VALID_PIN) {
      setStep("name")
      setPinError("")
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      if (newAttempts >= MAX_ATTEMPTS) {
        setPinError("Too many failed attempts. Please contact your supervisor.")
      } else {
        setPinError(`Invalid PIN. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
      }
      setPin("")
    }
  }

  const handleNameSubmit = () => {
    if (name.trim()) {
      setStep("type")
    }
  }

  const handleTypeSelect = (type: AgentType) => {
    onComplete({ name: name.trim(), type })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Phone className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Call Flow Assistant</CardTitle>
          <CardDescription>
            {step === "pin" && "Enter your agent PIN to continue"}
            {step === "name" && "What's your name?"}
            {step === "type" && "Select your department"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "pin" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pin">Agent PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
                  maxLength={6}
                  disabled={attempts >= MAX_ATTEMPTS}
                />
                {pinError && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {pinError}
                  </div>
                )}
              </div>
              <Button className="w-full" onClick={handlePinSubmit} disabled={!pin || attempts >= MAX_ATTEMPTS}>
                Continue
              </Button>
            </div>
          )}

          {step === "name" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                />
              </div>
              <Button className="w-full" onClick={handleNameSubmit} disabled={!name.trim()}>
                Continue
              </Button>
            </div>
          )}

          {step === "type" && (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground mb-4">
                Welcome, <span className="font-medium text-foreground">{name}</span>!
              </p>
              <div className="grid gap-3">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => handleTypeSelect("wireless")}
                >
                  <Phone className="h-6 w-6" />
                  <span>Wireless Agent</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => handleTypeSelect("cable")}
                >
                  <Wifi className="h-6 w-6" />
                  <span>Cable Agent</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
