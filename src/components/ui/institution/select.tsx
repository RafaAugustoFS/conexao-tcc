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
  value?: string;
  onChange?: (value: string) => void;
}

export function Select({ children, value, onChange }: SelectProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(value || null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    setIsOpen(false);
    if (onChange) onChange(newValue);
  };

  return (
    <SelectContext.Provider value={{ selectedValue, setSelectedValue: handleSelect, isOpen, setIsOpen }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
}

interface SelectProps {
  children: React.ReactNode;
  onChange?: (value: string) => void;
  defaultValue?: string;  // Adicionando suporte ao valor padrão
}

export function SelectEdit({ children, onChange, defaultValue }: SelectProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(defaultValue || null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <SelectContext.Provider value={{ selectedValue, setSelectedValue: handleSelect, isOpen, setIsOpen }}>
      <div className="relative w-full">{children}</div>
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
  if (!context) throw new Error("SelectValue must be used within a Select");

  return (
    <span className="text-gray-700 dark:text-white flex flex-row justify-center">
      {context.selectedValue && context.selectedValue.trim() !== "" ? context.selectedValue : placeholder}
    </span>
  );
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
  if (!context) throw new Error("SelectItem must be used within a Select");

  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#141414] cursor-pointer"
      onClick={() => {
        context.setSelectedValue(value);
      }}
    >
      {children}
    </div>
  );
}

