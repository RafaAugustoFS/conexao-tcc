"use client";

import { Card } from "@/components/ui/alunos/card";
import MessageList from "@/components/ui/institution/messageList";
import SidebarInstitution from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/alunos/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import WelcomeMessage from "@/components/ui/welcomeMessage";
import { Class } from "@/components/ui/teacher/class";
import { NoticeCard } from "@/components/ui/institution/noticeCard";
import LateralCalendar from "@/components/ui/lateralCalendar";
import { useTheme } from "@/components/ThemeProvider";


export default function DashboardTeacher() {
  const { darkMode, toggleTheme } = useTheme(); 
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-[#141414] text-white" : "bg-[#F0F7FF] text-black"
      }`}
    >
      <SidebarInstitution />
      <main className="flex-1 pl-6 pb-6 pr-6 pt-2">
        <div className="flex flex-col items-end">
        <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        {/* Mensagem de Boas-Vindas */}
        <div className="flex flex-row items-center">
          <WelcomeMessage name="Instituição" />
        </div>

        <NoticeCard />

        <div className="mt-6 w-full">
          <div className="rounded-xl">
            <MessageList/>
          </div>
        </div>
      </main>
      {/* Barra lateral direita */}
      <LateralCalendar />
    </div>
  );
}
