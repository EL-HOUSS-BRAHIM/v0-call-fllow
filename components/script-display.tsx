"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ScriptDisplayProps {
  text: string
  variant?: "info" | "success" | "warning" | "error"
}

export function ScriptDisplay({ text, variant = "info" }: ScriptDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const variantClasses = {
    info: "border-l-blue-500 bg-blue-50",
    success: "border-l-green-500 bg-green-50",
    warning: "border-l-orange-500 bg-orange-50",
    error: "border-l-red-500 bg-red-50",
  }

  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${variantClasses[variant]} relative group`}>
      <p className="text-sm leading-relaxed text-slate-900 pr-10">{text}</p>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Copy to clipboard"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}
