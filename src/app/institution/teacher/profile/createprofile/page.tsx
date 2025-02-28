"use client";
import  Sidebar  from "@/components/layout/sidebarInstitution"
import  {ProfileForm}  from "@/components/ui/institution/profile"
import { Button } from "@/components/ui/alunos/button"
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";


export default function Profile({ value, className }: { value: number; className?: string }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#ffffff]">Renato</h1>
              <p className="text-gray-500">Tue, 07 June 2022</p>
            </div>
            <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          </div>
          <ProfileForm/>
        </div>
      </main>
    </div>
  )
}