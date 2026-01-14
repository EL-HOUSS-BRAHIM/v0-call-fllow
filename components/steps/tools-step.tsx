"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlansComparison } from "@/components/tools/plans-comparison"
import { SpeedReference } from "@/components/tools/speed-reference"
import { BundleOptimizer } from "@/components/tools/bundle-optimizer"
import { DeviceFinancingGuide } from "@/components/tools/device-financing"
import { BarChart3 } from "lucide-react"

interface ToolsStepProps {
  brand: "rogers" | "fido"
  customerName: string
}

export function ToolsStep({ brand, customerName }: ToolsStepProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Agent Tools & Resources
        </CardTitle>
        <CardDescription>Strategic reference guides to optimize customer interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="plans" className="text-xs">
              Plans
            </TabsTrigger>
            <TabsTrigger value="speed" className="text-xs">
              Speed
            </TabsTrigger>
            <TabsTrigger value="bundle" className="text-xs">
              Bundles
            </TabsTrigger>
            <TabsTrigger value="device" className="text-xs">
              Devices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="mt-4">
            <PlansComparison brand={brand} />
          </TabsContent>

          <TabsContent value="speed" className="mt-4">
            <SpeedReference />
          </TabsContent>

          <TabsContent value="bundle" className="mt-4">
            <BundleOptimizer brand={brand} />
          </TabsContent>

          <TabsContent value="device" className="mt-4">
            <DeviceFinancingGuide />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
