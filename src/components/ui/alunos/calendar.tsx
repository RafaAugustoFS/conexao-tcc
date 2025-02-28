"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const WEEKDAYS = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"]

interface CalendarProps {
  selectedDate?: Date
  onSelectDate?: (date: Date) => void
  events: Array<{ date: number; color: string }>
}

export function Calendar({ selectedDate, onSelectDate, events }: CalendarProps) {
  const [currentMonth] = useState("Fevereiro 2025")

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#666666] dark:text-[#D0CECE]">Eventos</h1>
        <button className="flex items-center space-x-1 bg-white dark:bg-[#0D0D0D] ${className} px-3 py-2 rounded-lg">
          <span className="text-[#8A8A8A] dark:text-[#D0CECE]">{currentMonth}</span>
          <ChevronDown className="w-4 h-4 " />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-sm text-[#333333] dark:text-[#D0CECE]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
          const event = events.find((e) => e.date === day)
          return (
            <button
              key={day}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm text-[#666666]
                ${event ? `bg-${event.color}-500  text-[#ffffff] dark:text-black` : "hover:bg-[#ffffff] dark:hover:bg-[#000000] dark:text-[#666666]"}
                ${day === 1 ? "col-start-4" : ""}`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}