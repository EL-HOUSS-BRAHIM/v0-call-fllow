"use client"
import { Heart } from "lucide-react"
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
import { AuthenticationStep } from "@/components/steps/authentication-step"
import { PlansOffersStep } from "@/components/steps/plans-offers-step"
import { ClosingStep } from "@/components/steps/closing-step"
import { SurveyStep } from "@/components/steps/survey-step"
import { InsulateStep } from "@/components/steps/insulate-step"
import { WirelessWelcomeStep } from "@/components/steps/wireless-welcome-step"
import { CableWelcomeStep } from "@/components/steps/cable-welcome-step"
import { WirelessResolutionStep } from "@/components/steps/wireless-resolution-step"
import { CableResolutionStep } from "@/components/steps/cable-resolution-step"

interface CallFlowProps {
  agentInfo: AgentInfo
  onLogout: () => void
  onAdminClick?: () => void
}

export type CallStep = "welcome" | "authentication" | "resolution" | "insulate" | "offers" | "survey" | "closing"

export function CallFlow({ agentInfo, onLogout, onAdminClick }: CallFlowProps) {
  const [currentStep, setCurrentStep] = useState<CallStep>("welcome")
  const [customerName, setCustomerName] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<"rogers" | "fido">("rogers")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const getStepsForAgentType = () => {
    if (agentInfo.type === "wireless") {
      return [
        { id: "welcome", label: "Welcome", icon: <MessageSquare className="h-4 w-4" /> },
        { id: "authentication", label: "Authentication", icon: <Shield className="h-4 w-4" /> },
        { id: "resolution", label: "Resolution", icon: <Wrench className="h-4 w-4" /> },
        { id: "insulate", label: "Insulate & Retention", icon: <Heart className="h-4 w-4" /> },
        { id: "offers", label: "Device & Plans", icon: <Smartphone className="h-4 w-4" /> },
        { id: "survey", label: "Survey", icon: <MessageSquare className="h-4 w-4" /> },
        { id: "closing", label: "Closing", icon: <CheckCircle2 className="h-4 w-4" /> },
      ]
    } else {
      return [
        { id: "welcome", label: "Welcome", icon: <MessageSquare className="h-4 w-4" /> },
        { id: "authentication", label: "Authentication", icon: <Shield className="h-4 w-4" /> },
        { id: "resolution", label: "Resolution", icon: <Wrench className="h-4 w-4" /> },
        { id: "insulate", label: "Business Value", icon: <Heart className="h-4 w-4" /> },
        { id: "offers", label: "Bundles & Add-ons", icon: <Smartphone className="h-4 w-4" /> },
        { id: "survey", label: "Survey", icon: <MessageSquare className="h-4 w-4" /> },
        { id: "closing", label: "Closing", icon: <CheckCircle2 className="h-4 w-4" /> },
      ]
    }
  }

  const STEPS = getStepsForAgentType()
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

  const renderStepContent = () => {
    if (agentInfo.type === "wireless") {
      switch (currentStep) {
        case "welcome":
          return <WirelessWelcomeStep onNext={nextStep} brand={selectedBrand} />
        case "authentication":
          return <AuthenticationStep onNext={nextStep} agentType="wireless" brand={selectedBrand} />
        case "resolution":
          return <WirelessResolutionStep onNext={nextStep} />
        case "insulate":
          return <InsulateStep onNext={nextStep} agentType="wireless" />
        case "offers":
          return <PlansOffersStep onNext={nextStep} agentType="wireless" brand={selectedBrand} />
        case "survey":
          return <SurveyStep onNext={nextStep} />
        case "closing":
          return <ClosingStep agentType="wireless" />
        default:
          return null
      }
    } else {
      switch (currentStep) {
        case "welcome":
          return <CableWelcomeStep onNext={nextStep} brand={selectedBrand} />
        case "authentication":
          return <AuthenticationStep onNext={nextStep} agentType="cable" brand={selectedBrand} />
        case "resolution":
          return <CableResolutionStep onNext={nextStep} />
        case "insulate":
          return <InsulateStep onNext={nextStep} agentType="cable" />
        case "offers":
          return <PlansOffersStep onNext={nextStep} agentType="cable" brand={selectedBrand} />
        case "survey":
          return <SurveyStep onNext={nextStep} />
        case "closing":
          return <ClosingStep agentType="cable" />
        default:
          return null
      }
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
                Agent: {agentInfo.name} • {agentInfo.type === "wireless" ? "📱 Wireless" : "🌐 Cable/Internet"}
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
        <div className="grid lg:grid-cols-4 gap-4">
          {/* Sidebar - Step Navigation (Desktop only) */}
          <Card
            className={`h-fit sticky top-24 lg:col-span-1 ${isSidebarCollapsed ? "hidden" : "block"} transition-all duration-300`}
          >
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
          <div className="lg:col-span-3 space-y-4">
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
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
