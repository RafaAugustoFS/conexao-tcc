"use client"

import type React from "react"

interface SmallSelectProps {
  ariaLabel: string
  selectedType: string | number | null
  setSelectedType: (value: string) => void
  placeholder: string
  items: string[]
}

const SmallSelect: React.FC<SmallSelectProps> = ({ ariaLabel, selectedType, setSelectedType, placeholder, items }) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <label htmlFor="select" className="sr-only">
          {ariaLabel}
        </label>
        <select
          id="select"
          className="block w-full py-2 pl-3 pr-5 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-[#242424] dark:border-gray-700 dark:text-white"
          value={selectedType || ""}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">{placeholder}</option>
          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SmallSelect

