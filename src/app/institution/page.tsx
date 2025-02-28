"use client";

import { Card} from "@/components/ui/alunos/card";
import MessageList from "@/components/ui/alunos/messageList";
import SidebarInstitution from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/alunos/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import WelcomeMessage from "@/components/ui/welcomeMessage";
import { Class } from "@/components/ui/teacher/class";
import { NoticeCard } from "@/components/ui/teacher/noticeCard";
import LateralCalendar from "@/components/ui/lateralCalendar";

export default function DashboardTeacher() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);


  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-[#141414] text-white" : "bg-[#F0F7FF] text-black"
      }`}
    >
      <SidebarInstitution/>
      <main className="flex-1 pl-6 pb-6 pr-6 pt-2">
        <div className="flex flex-col items-end">
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
           {/* Mensagem de Boas-Vindas */}
                <div className="flex flex-row items-center">
                  <WelcomeMessage name="Instituição" />
                </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <Card>
            <h2 className="text-blue-600 font-semibold mb-4">Turmas</h2>
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
              <Class />
            </div>
          </Card>
          <Card>
            <h2 className="text-blue-600 font-semibold mb-4">Aviso</h2>
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200" >
            <NoticeCard/>
            </div>
          </Card>
        </div>
        <div className="mt-6 w-full">
          <div className="rounded-xl">
            <MessageList value={0} />
          </div>
        </div>
      </main>
       {/* Barra lateral direita */}
            <LateralCalendar />
    </div>
  );
}
