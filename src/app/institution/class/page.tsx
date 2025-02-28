"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/alunos/button";
import Sidebar from "@/components/layout/sidebarInstitution";
import SearchInput from "@/components/ui/search";
import FloatingButton from "@/components/ui/institution/FloatingButton";
import Link from "next/link";
import DeleteModal from "@/components/modals/modelDelete";

export default function CheckInEmocional({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
    const students = [
        "Alice Fernandes",
        "Bianca Ferreira",
        "Bruno Oliveira",
        "Camila Souza",
        "Daniel Pereira",
        "Diego Santana",
        "Eduardo Lima",
        "Evelyn Moraes",
        "Felipe Andrade",
        "Fernanda Costa",
        "Gabriel Martins",
        "Giovanna Martins",
        "Alice Fernandes",
        "Bianca Ferreira",
        "Bruno Oliveira",
        "Camila Souza",
        "Daniel Pereira",
        "Diego Santana",
        "Eduardo Lima",
        "Evelyn Moraes",
        "Felipe Andrade",
        "Fernanda Costa",
        "Gabriel Martins",
        "Giovanna Martins",
      ];
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  
   useEffect(() => {
      setCurrentPage(1);
    }, [search]);
  
    useEffect(() => {
        setCurrentPage(1);
      }, [search]);
    
      const filteredStudents = students.filter((student) =>
        student.toLowerCase().includes(search.toLowerCase())
      );
      const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
      const displayedStudents = filteredStudents.slice(
        (currentPage - 1) * studentsPerPage,
        currentPage * studentsPerPage
      );
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
        <div className="container mx-auto border  bg-[#FFFFFF] w-[85%] h-[85%] p-8 pr-15 pt-20 pb-20 space-y-2 rounded-3xl dark:bg-black dark:border-black ">
          <div className="relative w-full max-w-md mx-auto flex justify-center items-center mb-6">
            <SearchInput placeholder="Digite o nome ou código da turma"/>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Turma A - 1º Ano",
                code: "0231000",
                students: 30,
                time: "08h - 12h",
              },
              {
                title: "Turma B - 2º Ano",
                code: "0321000",
                students: 28,
                time: "13h - 17h",
              },
              {
                title: "Turma C - 3º Ano",
                code: "0312000",
                students: 26,
                time: "19h - 22h",
              },
              {
                title: "Turma C - 3º Ano",
                code: "0312000",
                students: 26,
                time: "19h - 22h",
              },
              {
                title: "Turma C - 3º Ano",
                code: "0312000",
                students: 26,
                time: "19h - 22h",
              },
              {
                title: "Turma B - 1º Ano",
                code: "0312000",
                students: 26,
                time: "13h - 17h",
              }
            ].map((turma, index) => (
              <div
                key={index}
                className="bg-blue-50 dark:bg-[#141414] p-4 rounded-lg shadow"
              >
                <h3 className="font-bold text-lg dark:text-white">
                  {turma.title}{" "}
                  <span className="text-gray-500 text-sm dark:text-[#8A8A8A]">
                    Nº{turma.code}
                  </span>
                </h3>
                <p className="text-gray-700 dark:text-white">
                  {turma.students} alunos ativos
                </p>
                <p className="text-gray-700 dark:text-white">
                  Horário: Segunda a Sexta,{" "}
                  <span className="text-blue-500 font-bold">{turma.time}</span>
                </p>
                <div className="flex flex-row items-center space-x-16">
                  <Link href="class/viewclass">
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                      Visualizar turma
                    </button>
                  </Link>
                  <div className="space-x-4">
                  <Link href="class/editclass">
                  <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                    <Pencil size={20} />
                  </button>
                  </Link>
                  <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600" onClick={() => setIsModalOpen(true)}>
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
          {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 mx-1 rounded-md transition ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white dark:text-black"
                        : "bg-[#F0F7FF] text-blue-500 hover:bg-gray-300 dark:bg-[#141414]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
        </div>
        <FloatingButton rote="class/createclass"/>
      </div>
      <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={() => { setIsModalOpen(false); console.log("Turma excluída"); }} />
    </div>
  );
}
