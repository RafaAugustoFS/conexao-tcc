"use client";

import { useEffect, useState } from "react";
import { ArrowDownCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/alunos/button";
import Sidebar from "@/components/layout/sidebarTeacher";
import SearchInput from "@/components/ui/search";

export default function StudentsPage({
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
    <div
      className={`min-h-screen bg-[#F0F7FF] flex flex-row dark:bg-[#141414]`}
    >
      <Sidebar />
      <div className="w-full flex flex-col items-center mt-8">
        <div className="w-full flex justify-end mb-8 mr-28">
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
        <div className="container mx-auto p-4 border dark:border-black rounded-lg bg-[#FFFFFF] w-[85%] p-8 pr-15 pt-20 pb-20 space-y-2 rounded-3xl dark:bg-black">
          <div className="relative w-full max-w-md mx-auto flex justify-center items-center mb-6">
            <SearchInput placeholder={undefined} />
          </div>
          <div className=" overflow-x-auto overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse border border-[#1A85FF] dark:border-black">
                <thead>
                  <tr className="bg-[#1A85FF] text-white">
                    <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">
                      Nome do aluno
                    </th>
                    <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">
                      Nº da Matrícula
                    </th>
                    <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">
                      Média(%)
                    </th>
                    <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">
                      Notas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Alice Fernandes", id: "2025001", grade: "87%" },
                    { name: "Bianca Ferreira", id: "2025002", grade: "72%" },
                    { name: "Bruno Oliveira", id: "2025003", grade: "75%" },
                    { name: "Camila Souza", id: "2025004", grade: "92%" },
                    { name: "Daniel Pereira", id: "2025005", grade: "68%" },
                  ].map((student, index) => (
                    <tr key={index} className="border border-blue-500">
                      <td className="p-2 border border-blue-500 dark:text-white">
                        {student.name}
                      </td>
                      <td className="p-2 border border-blue-500 dark:text-[#8A8A8A]">
                        {student.id}
                      </td>
                      <td className="p-2 border border-blue-500 dark:text-white">
                        {student.grade}
                      </td>
                      <td className="p-2 border border-blue-500 cursor-pointer">
                        <a
                          href="/teacher/students/notes"
                          className="text-blue-500"
                        >
                          Ver Notas
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
