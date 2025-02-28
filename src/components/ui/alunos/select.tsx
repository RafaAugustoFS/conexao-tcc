"use client";

import * as React from "react";

// Criando um contexto para gerenciar o estado do Select
interface SelectContextType {
  selectedValue: string | null;
  setSelectedValue: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

interface SelectProps {
  children: React.ReactNode;
  onChange?: (value: string) => void;
}

export function Select({ children, onChange }: SelectProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <SelectContext.Provider value={{ selectedValue, setSelectedValue: handleSelect, isOpen, setIsOpen }}>
      <div className="relative w-48">{children}</div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps {
  children?: React.ReactNode;
  className?: string;
}

export function SelectTrigger({ children, className }: SelectTriggerProps) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectTrigger must be used within a Select");

  return (
    <button
      className={`flex flex-row justify-center border dark:border-[#0077FF] px-4 py-2 rounded w-full text-left ${className} w-[180px]`}
      onClick={() => context.setIsOpen(!context.isOpen)}
    >
      {children}
    </button>
  );
}

interface SelectValueProps {
  placeholder?: string;
}

export function SelectValue({ placeholder = "Tipo de ocorrência" }: SelectValueProps) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("Error");

  return <span className="text-gray-700 dark:text-white w-36 flex flex-row justify-center">{context.selectedValue || placeholder}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("Error");

  return context.isOpen ? (
    <div className="absolute mt-2 w-full border dark:border-[#141414] bg-white dark:bg-black dark:text-white shadow-md z-50">{children}</div>
  ) : null;
}

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
}

export function SelectItem({ children, value }: SelectItemProps) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("Error");

  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#141414] cursor-pointer"
      onClick={() => context.setSelectedValue(value)}
    >
      {children}
    </div>
  );
}
