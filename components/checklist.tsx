"use client"

import { useState } from "react"
import { Check } from "lucide-react"

interface ChecklistItem {
  id: string
  label: string
  completed?: boolean
}

interface ChecklistProps {
  items: ChecklistItem[]
  onItemToggle?: (id: string, completed: boolean) => void
}

export function Checklist({ items: initialItems, onItemToggle }: ChecklistProps) {
  const [items, setItems] = useState(initialItems)

  const toggleItem = (id: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    setItems(updated)
    onItemToggle?.(id, !items.find((i) => i.id === id)?.completed)
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <label
          key={item.id}
          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
            item.completed
              ? "bg-green-50 border-green-200"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          <input
            type="checkbox"
            checked={item.completed || false}
            onChange={() => toggleItem(item.id)}
            className="sr-only"
          />
          <div
            className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
              item.completed ? "bg-green-500 border-green-500" : "border-slate-300 group-hover:border-slate-400"
            }`}
          >
            {item.completed && <Check className="h-3 w-3 text-white" />}
          </div>
          <span className={`text-sm ${item.completed ? "line-through text-slate-500" : "text-slate-900"}`}>
            {item.label}
          </span>
        </label>
      ))}
    </div>
  )
}
