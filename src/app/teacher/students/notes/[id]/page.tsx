"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/ui/teacher/gradeTableStudents";
import Sidebar from "@/components/layout/sidebarTeacher";
import { Button } from "@/components/ui/alunos/button";
import { Moon, Sun } from "lucide-react";



export default function Notes({
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
      <main className="flex-1 ">
        <div className="p-8">
          <div className="w-full flex justify-end mb-8 mr-28">
            <Button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          <Table />
        </div>
      </main>
    </div>
  );
}
