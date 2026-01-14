"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Zap } from "lucide-react"

export function SpeedReference() {
  return (
    <div className="space-y-4">
      <Alert>
        <Zap className="h-4 w-4" />
        <AlertTitle>Network Architecture Differences</AlertTitle>
        <AlertDescription>
          Rogers has software-defined speed caps that limit performance. Fido is hardware-limited to 4G LTE. Neither
          actually goes "unlimited" - they both throttle or pause.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Rogers Speed Tiers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rogers Speed Profiles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="border-l-4 border-orange-400 pl-3">
                <h4 className="font-semibold text-sm">Essentials Tier</h4>
                <p className="text-xs text-gray-600">Download: 250 Mbps cap</p>
                <p className="text-xs text-gray-600">After cap: 256 Kbps (text emails only)</p>
                <p className="text-xs pt-1">✓ HD Video (5-10 Mbps)</p>
                <p className="text-xs">✗ 4K Video (needs 25 Mbps)</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-3">
                <h4 className="font-semibold text-sm">Popular/Ultimate Tier</h4>
                <p className="text-xs text-gray-600">Download: Up to 1 Gbps (5G+)</p>
                <p className="text-xs text-gray-600">After cap: 256-512 Kbps</p>
                <p className="text-xs pt-1">✓ 4K Video & bulk downloads</p>
                <p className="text-xs">✓ Gaming & tethering multiple devices</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fido Speed Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fido Speed Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-l-4 border-pink-500 pl-3">
              <h4 className="font-semibold text-sm">All Plans (4G LTE Only)</h4>
              <p className="text-xs text-gray-600">Download: 150 Mbps cap</p>
              <p className="text-xs text-gray-600">Latency: 20-40ms (vs 5G: &lt;10ms)</p>
              <p className="text-xs pt-1">✓ HD Streaming (1080p)</p>
              <p className="text-xs">✓ Video conferencing & VoIP</p>
              <p className="text-xs">✗ 4K streaming (would need 25 Mbps sustained)</p>
              <p className="text-xs">✗ Multiple high-bandwidth devices</p>
              <p className="text-xs text-blue-600 pt-2 font-semibold">Key: When cap reached = PAUSE (no throttle)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Use Case Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Use Case Reference Guide</CardTitle>
          <CardDescription>Which plan works for which customer behavior?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                usage: "Light (Email, social media, maps)",
                fido: "✓ Any plan (2-40GB)",
                rogers: "✓ Essentials 60GB",
              },
              {
                usage: "Moderate (HD streaming, browsing, music)",
                fido: "✓ 40-60GB (sweet spot)",
                rogers: "✓ Essentials 100GB or Popular",
              },
              {
                usage: "Heavy (4K video, gaming, tethering)",
                fido: "⚠ 100GB+ (still 4G, not ideal)",
                rogers: "✓ Popular/Ultimate (uncapped 5G+)",
              },
              {
                usage: "Extended coverage (EXT) heavy",
                fido: "⚠ Risk: >50% EXT = service restriction",
                rogers: "✓ Better for roaming users",
              },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 text-xs p-2 border rounded">
                <div className="font-semibold">{row.usage}</div>
                <div>{row.fido}</div>
                <div>{row.rogers}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
