"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Phone,
  LogOut,
  ChevronRight,
  ChevronLeft,
  User,
  Shield,
  Wrench,
  Smartphone,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Settings,
} from "lucide-react"
import type { AgentInfo } from "@/app/page"
import { WelcomeStep } from "@/components/steps/welcome-step"
import { AuthenticationStep } from "@/components/steps/authentication-step"
import { ProblemResolutionStep } from "@/components/steps/problem-resolution-step"
import { PlansOffersStep } from "@/components/steps/plans-offers-step"
import { ClosingStep } from "@/components/steps/closing-step"

interface CallFlowProps {
  agentInfo: AgentInfo
  onLogout: () => void
  onAdminClick?: () => void
}

export type CallStep = "welcome" | "authentication" | "resolution" | "offers" | "closing"

const STEPS: { id: CallStep; label: string; icon: React.ReactNode }[] = [
  { id: "welcome", label: "Welcome", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "authentication", label: "Authentication", icon: <Shield className="h-4 w-4" /> },
  { id: "resolution", label: "Resolution", icon: <Wrench className="h-4 w-4" /> },
  { id: "offers", label: "Plans & Offers", icon: <Smartphone className="h-4 w-4" /> },
  { id: "closing", label: "Closing", icon: <CheckCircle2 className="h-4 w-4" /> },
]

export function CallFlow({ agentInfo, onLogout, onAdminClick }: CallFlowProps) {
  const [currentStep, setCurrentStep] = useState<CallStep>("welcome")
  const [customerName, setCustomerName] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<"rogers" | "fido">("rogers")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 100)
      if (scrollY > 200 && window.innerWidth < 1024) {
        setIsSidebarCollapsed(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const goToStep = (step: CallStep) => {
    setCurrentStep(step)
  }

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentStepIndex + 1].id)
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1].id)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">Call Flow Assistant</h1>
              <p className="text-xs text-muted-foreground">
                Agent: {agentInfo.name} • {agentInfo.type === "wireless" ? "Wireless" : "Cable"}
                {agentInfo.isAdmin && <span className="ml-1 text-primary">(Admin)</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={selectedBrand} onValueChange={(v) => setSelectedBrand(v as "rogers" | "fido")}>
              <TabsList>
                <TabsTrigger value="rogers">Rogers</TabsTrigger>
                <TabsTrigger value="fido">Fido</TabsTrigger>
              </TabsList>
            </Tabs>
            {onAdminClick && (
              <Button variant="outline" size="icon" onClick={onAdminClick} title="Admin Panel">
                <Settings className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="lg:hidden sticky top-[57px] z-10 bg-background border-b shadow-sm">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="w-full px-4 py-2 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Call Progress</span>
            <span className="text-xs text-muted-foreground">
              Step {currentStepIndex + 1}: {STEPS[currentStepIndex].label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Mini progress dots */}
            <div className="flex items-center gap-1">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    index <= currentStepIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            {isSidebarCollapsed ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </button>

        {/* Expandable step navigation */}
        <div className={`overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? "max-h-0" : "max-h-80"}`}>
          <div className="p-2 border-t bg-muted/50">
            {customerName && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 px-2 pb-2">
                <User className="h-3 w-3" />
                Customer: {customerName}
              </p>
            )}
            <nav className="grid grid-cols-5 gap-1">
              {STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => {
                    goToStep(step.id)
                    setIsSidebarCollapsed(true)
                  }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-md text-xs transition-colors ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : index < currentStepIndex
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      currentStep === step.id
                        ? "bg-primary-foreground/20"
                        : index < currentStepIndex
                          ? "bg-primary/20"
                          : "bg-muted"
                    }`}
                  >
                    {index < currentStepIndex ? <CheckCircle2 className="h-3 w-3" /> : index + 1}
                  </span>
                  <span className="truncate w-full text-center">{step.label.split(" ")[0]}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar - Step Navigation (Desktop only) */}
          <Card className="h-fit sticky top-24 hidden lg:block">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Call Progress</CardTitle>
              {customerName && (
                <CardDescription className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  {customerName}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1 p-2">
                {STEPS.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(step.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : index < currentStepIndex
                          ? "text-muted-foreground hover:bg-muted"
                          : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                        currentStep === step.id
                          ? "bg-primary-foreground/20"
                          : index < currentStepIndex
                            ? "bg-primary/10 text-primary"
                            : "bg-muted"
                      }`}
                    >
                      {index < currentStepIndex ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                    </span>
                    <span>{step.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="space-y-4">
            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={prevStep} disabled={currentStepIndex === 0}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index <= currentStepIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <Button onClick={nextStep} disabled={currentStepIndex === STEPS.length - 1}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Step Content */}
            {currentStep === "welcome" && (
              <WelcomeStep
                agentName={agentInfo.name}
                brand={selectedBrand}
                customerName={customerName}
                onCustomerNameChange={setCustomerName}
                onNext={nextStep}
              />
            )}
            {currentStep === "authentication" && (
              <AuthenticationStep
                agentName={agentInfo.name}
                brand={selectedBrand}
                customerName={customerName}
                onNext={nextStep}
              />
            )}
            {currentStep === "resolution" && (
              <ProblemResolutionStep
                agentName={agentInfo.name}
                brand={selectedBrand}
                customerName={customerName}
                agentType={agentInfo.type}
                onNext={nextStep}
              />
            )}
            {currentStep === "offers" && (
              <PlansOffersStep
                brand={selectedBrand}
                customerName={customerName}
                agentType={agentInfo.type}
                onNext={nextStep}
              />
            )}
            {currentStep === "closing" && (
              <ClosingStep agentName={agentInfo.name} brand={selectedBrand} customerName={customerName} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
