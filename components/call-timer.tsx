"use client"

import { useEffect, useState } from "react"
import { Clock, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CallTimerProps {
  onReset?: () => void
}

export function CallTimer({ onReset }: CallTimerProps) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const handleReset = () => {
    setSeconds(0)
    onReset?.()
  }

  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
      <Clock className="h-4 w-4 text-red-600" />
      <span className="font-mono text-lg font-bold text-red-600">{formatTime(seconds)}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleReset}
        className="text-xs text-red-600 hover:text-red-700"
        title="Reset timer"
      >
        <RotateCcw className="h-3 w-3" />
      </Button>
    </div>
  )
}
