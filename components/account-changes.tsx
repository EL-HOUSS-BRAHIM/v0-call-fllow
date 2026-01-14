"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AccountChangeOption {
  id: string
  title: string
  description: string
  action: () => void
}

export function AccountChanges() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const options: AccountChangeOption[] = [
    {
      id: "address",
      title: "Update Address",
      description: "Change billing or service address",
      action: () => {
        console.log("[v0] Update Address clicked")
        setSelectedOption("address")
      },
    },
    {
      id: "plan",
      title: "Change Plan",
      description: "Upgrade, downgrade, or switch plans",
      action: () => {
        console.log("[v0] Change Plan clicked")
        setSelectedOption("plan")
      },
    },
    {
      id: "features",
      title: "Add/Remove Features",
      description: "Modify add-ons and services",
      action: () => {
        console.log("[v0] Add/Remove Features clicked")
        setSelectedOption("features")
      },
    },
    {
      id: "payment",
      title: "Update Payment Method",
      description: "Change credit card or banking info",
      action: () => {
        console.log("[v0] Update Payment Method clicked")
        setSelectedOption("payment")
      },
    },
    {
      id: "line",
      title: "Add a Line",
      description: "Add new phone to account",
      action: () => {
        console.log("[v0] Add a Line clicked")
        setSelectedOption("line")
      },
    },
    {
      id: "ownership",
      title: "Transfer Ownership",
      description: "Change account holder",
      action: () => {
        console.log("[v0] Transfer Ownership clicked")
        setSelectedOption("ownership")
      },
    },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Account Changes</h2>
          <p className="text-muted-foreground">
            "I can help you update your account. What changes would you like to make today?"
          </p>
        </div>

        <div className="grid gap-3 mb-6">
          {options.map((option) => (
            <Button
              key={option.id}
              onClick={option.action}
              variant={selectedOption === option.id ? "default" : "outline"}
              className="h-auto p-4 justify-start text-left"
            >
              <div className="flex flex-col">
                <span className="font-semibold">{option.title}</span>
                <span className="text-sm opacity-75">{option.description}</span>
              </div>
            </Button>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3 text-sm text-blue-800 dark:text-blue-200">
          <p>Some changes may require additional verification. Always confirm changes before finalizing.</p>
        </div>
      </Card>
    </div>
  )
}
