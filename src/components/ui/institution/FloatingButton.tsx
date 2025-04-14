"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

interface FloatingButtonProps {
  rote?: string
  onClick?: () => void
}

export default function FloatingButton({ rote = "/", onClick }: FloatingButtonProps) {
  // Common styling for both button and link
  const buttonStyle =
    "fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"

  // If onClick is provided, render a button with the onClick handler
  if (onClick) {
    return (
      <button onClick={onClick} className={buttonStyle}>
        <Plus size={24} />
      </button>
    )
  }

  // Otherwise, render a Link component
  return (
    <Link href={rote} className={buttonStyle}>
      <Plus size={24} />
    </Link>
  )
}
