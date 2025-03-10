"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

const WEEKDAYS = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"]
const MONTHS = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
]

interface Event {
  id: number
  uidEvente: string
  dateTimeEvent: string | null
  localEvente: string
  descrfsendEvente: string
}

interface CalendarProps {
  selectedDate?: Date
  onSelectDate?: (date: Date) => void
}

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState("")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()) // Mês atual (0-11)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()) // Ano atual
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/event?month=${selectedMonth + 1}&year=${selectedYear}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar eventos");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
  
    fetchEvents();
  }, [selectedMonth, selectedYear]); // Aqui o array de dependências é consistente

  useEffect(() => {
    const formattedMonth = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    }).format(new Date(selectedYear, selectedMonth))
    setCurrentMonth(formattedMonth)
  }, [selectedMonth, selectedYear])

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value))
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
  const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear)

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#666666] dark:text-[#D0CECE]">Eventos</h1>
        <div className="flex items-center space-x-2">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="bg-white dark:bg-[#0D0D0D] px-3 py-2 rounded-lg text-[#8A8A8A] dark:text-[#D0CECE]"
          >
            {MONTHS.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-sm text-[#333333] dark:text-[#D0CECE]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8 w-8"></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const event = events.find((e) => {
            const eventDate = e.dateTimeEvent ? new Date(e.dateTimeEvent) : null
            return eventDate && eventDate.getDate() === day && eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear
          })
          return (
            <button
              key={day}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm text-[#666666]
                ${event ? "bg-blue-500 text-white" : "hover:bg-[#ffffff] dark:hover:bg-[#000000] dark:text-[#666666]"}`}
              title={event ? event.descrfsendEvente : ""}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}