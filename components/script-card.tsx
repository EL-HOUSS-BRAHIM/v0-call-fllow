import type React from "react"
import { cn } from "@/lib/utils"

interface ScriptCardProps {
  children: React.ReactNode
  variant?: "primary" | "success" | "warning" | "info"
  className?: string
}

export function ScriptCard({ children, variant = "primary", className }: ScriptCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg border-l-4 bg-muted/50",
        {
          "border-l-primary": variant === "primary",
          "border-l-green-500 bg-green-50": variant === "success",
          "border-l-orange-500 bg-orange-50": variant === "warning",
          "border-l-blue-500 bg-blue-50": variant === "info",
        },
        className,
      )}
    >
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
