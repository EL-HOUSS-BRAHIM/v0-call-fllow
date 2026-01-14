"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function DeviceFinancingGuide() {
  return (
    <div className="space-y-4">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Device Financing is a Lock-In Tool</AlertTitle>
        <AlertDescription>
          Both Rogers and Fido use device financing as a secondary retention mechanism. Early cancellation forfeits
          remaining bill credits.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Rogers Device Strategy */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rogers Device Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <p>
                <strong>Key Insight:</strong> Device subsidy access is TIER-DEPENDENT
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>
                  <strong>Essentials plans:</strong> Limited to older/budget devices or high finance charges
                </li>
                <li>
                  <strong>Popular/Ultimate:</strong> Access to flagship phones (iPhone Pro, Galaxy S-series)
                </li>
                <li>
                  <strong>Program:</strong> Save & Return (flag devices, early upgrade path)
                </li>
              </ul>
            </div>
            <div className="bg-red-50 p-2 rounded text-xs border border-red-200">
              <p>
                <strong>Retention Lever:</strong> Customer threatens to leave? Ask what device they want. Being denied a
                flagship device due to plan tier is a strong upsell trigger.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fido Device Strategy */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fido Payment Program (FPP)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <p>
                <strong>Mechanics:</strong> 0% APR, 24-month installment
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Full retail price ÷ 24 months = base charge</li>
                <li>Fido applies monthly "Program Credit" (often $32+/month)</li>
                <li>Customer pays pennies per month for flagship devices</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-2 rounded text-xs border border-orange-200">
              <p>
                <strong>The Trap:</strong> Cancel at month 12? Remaining credits are FORFEITED. Customer owes remaining
                balance at full price. Effective lock-in without explicitly calling it a contract.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Agent Talking Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="border-l-4 border-blue-500 pl-3">
            <p className="font-semibold text-blue-700">Scenario: "I want a new iPhone but it's too expensive"</p>
            <p className="text-xs text-gray-600 mt-1">
              → "On our plan, the iPhone 16 Pro is only $X/month with the bill credit. That's less than your morning
              coffee."
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-3">
            <p className="font-semibold text-green-700">Scenario: "I'm switching to Fido to save money"</p>
            <p className="text-xs text-gray-600 mt-1">
              → "Fido doesn't have 5G, so your speeds will drop. Plus, if you ever cancel before 24 months, you'll lose
              all the device credits and owe the full price difference."
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-3">
            <p className="font-semibold text-purple-700">Scenario: Customer on Essentials wants flagsh Device</p>
            <p className="text-xs text-gray-600 mt-1">
              → "You can upgrade to a Popular plan to unlock the flagship device discount. Your per-line cost only goes
              up $X/month, but you get a $900 device for almost free."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
