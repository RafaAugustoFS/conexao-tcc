"use client";
import Sidebar from "@/components/layout/sidebarInstitution";
import { ProfileInfo } from "@/components/ui/teacher/profile";
import { Button } from "@/components/ui/alunos/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function User({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
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
          <div className="flex items-center justify-end mb-8 w-full">
            
            <Button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
          <ProfileInfo
            name="Renato de Souza"
            email="renatoa@gmail.com"
            birthDate="07/01/1990"
            phone="(11) 99952-8203"
            registrationNumber="810693449-1"
            classes={""}
            password={""}
          />
        </div>
      </main>
    </div>
  );
}
