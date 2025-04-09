"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/sidebarInstitution";
import  BiggerCalendar from "@/components/ui/institution/biggerCalendar";
import { Button } from "@/components/ui/alunos/button";
import { Moon, Plus, Sun } from "lucide-react";
import { EventSidebar } from "@/components/ui/alunos/event-sidebar";
import Modal from "@/components/modals/modalFloatingButton";
import { useTheme } from "@/components/ThemeProvider";


export default function Event() {
  const { darkMode, toggleTheme } = useTheme(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("pt-BR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleEventCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };
  

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8 max-2xl:pt-14">
          <div className="flex items-center justify-between mb-8">
            <div>
            <h1 className="text-2xl font-bold text-blue-500">
                  Eventos
                </h1>
                <p className="text-gray-500">{getCurrentDate()}</p>
            </div>
            <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          </div>
        </div>

        <div className="flex flex-row max-w-[1000px] mx-auto bg-white rounded-[20px] p-1 dark:bg-black">
        <BiggerCalendar onEventCreated={handleEventCreated} />
        </div>
      </main>
      <EventSidebar key={refreshKey} />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
