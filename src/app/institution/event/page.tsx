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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-gray-500">Tue, 07 June 2022</p>
            </div>
            <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          </div>
        </div>

        <div className="flex flex-row max-w-[1000px] mx-auto bg-white rounded-[20px] p-1 dark:bg-black">
          <BiggerCalendar />
        </div>
      </main>
      <EventSidebar />
      <button onClick={() => setIsModalOpen(true)}
      className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
    >
      <Plus size={24} />
    </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
