"use client";
import Sidebar from "@/components/layout/sidebarTeacher";
import { ProfileInfo } from "@/components/ui/teacher/profileStudent";
import { OccurrencesTable } from "@/components/ui/teacher/ocurrenceTable";
import  Occurrence  from "@/components/ui/teacher/ocurrence";
import { Button } from "@/components/ui/alunos/button";
import { useEffect, useState } from "react";
import { Moon, Sun, Pencil, Trash } from "lucide-react";

export default function User({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
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
          <div className="flex items-center justify-between mb-8 ">
            <Button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
          <div className="bg-white dark:bg-black rounded-lg shadow-sm p-8 space-y-6 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            <ProfileInfo
              name="Renata Vieira de Souza"
              email="revieira@gmail.com"
              birthDate="23/01/2006"
              phone="(11) 95312-8203"
              registrationNumber="110643448-1"
            />
            <OccurrencesTable />
            <Occurrence/>
     
          </div>
        </div>
      </main>
    </div>
  );
}
