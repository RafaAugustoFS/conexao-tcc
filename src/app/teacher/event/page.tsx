"use client";
import Sidebar from "@/components/layout/sidebarTeacher";
import  BiggerCalendar from "../../../components/ui/alunos/biggerCalendar";
import { Button } from "@/components/ui/alunos/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { EventSidebar } from "@/components/ui/alunos/event-sidebar";


export default function Event() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414] ">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
          <div className='w-full flex justify-end mb-8 mr-10'>
                    <Button onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>
                </div>
          </div>
        </div>
       
          <div className="w-[800px]  mx-auto bg-white  rounded-[20px] p-1 dark:bg-black">
          <BiggerCalendar /> 
        </div>
      </main>
      <EventSidebar/>
    </div>
  );
}
