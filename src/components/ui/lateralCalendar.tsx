"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { User } from "../../components/ui/alunos/user"
import { Calendar } from "../../components/ui/alunos/calendar"
import { EventList } from "../../components/ui/alunos/event-list"
import type { Event } from "../../types/event"

export default function LateralCalendar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Check screen size and set collapsed state
  useEffect(() => {
    const checkScreenSize = () => {
      const shouldCollapse = window.innerWidth < 1536
      setIsCollapsed(shouldCollapse)
      if (shouldCollapse) setIsOpen(false)
      else setIsOpen(true)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const toggleCalendar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Toggle button for collapsed view - always visible when collapsed */}
      <button
        onClick={toggleCalendar}
        className="fixed top-4 right-4 z-50 2xl:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
        aria-label={isOpen ? "Fechar calendário" : "Abrir calendário"}
      >
        {isOpen ? (
          <ChevronRight className="w-6 h-6 text-blue-500" />
        ) : (
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        )}
      </button>

      {/* Overlay when calendar is open in collapsed mode */}
      {isOpen && isCollapsed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 2xl:hidden" onClick={toggleCalendar} />
      )}

      {/* Calendar panel */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed 2xl:static right-0 z-40 w-80 h-screen bg-white dark:bg-black rounded-l-[20px] transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="max-w-md mx-auto p-4">
          <User />
          <Calendar/>
          <EventList/>
        </div>
      </div>
    </>
  )
}

