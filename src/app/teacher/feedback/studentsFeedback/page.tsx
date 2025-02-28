"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/alunos/button";
import Sidebar from "@/components/layout/sidebarTeacher";
import SearchInput from "@/components/ui/search";
import CardPerson from "@/components/ui/teacher/cardFeedbackTeacher";

const teachers = [
  "Ana Souza",
  "Carlos Mendes",
  "Débora Lima",
  "Eduardo Silva",
  "Fernanda Rocha",
  "Gabriel Almeida",
  "Helena Castro",
  "Igor Nunes",
  "Juliana Farias",
  "Leonardo Campos",
  "Mariana Duarte",
  "Nathan Borges",
  "Otávio Pereira",
  "Paula Martins",
  "Ricardo Santos",
  "Simone Costa",
  "Tatiane Oliveira",
  "Vitor Fernandes",
];

export default function TeacherList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 6;
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  const displayedTeachers = filteredTeachers.slice(
    (currentPage - 1) * teachersPerPage,
    currentPage * teachersPerPage
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex dark:bg-[#141414]">
      <Sidebar />
      <div className="w-full flex flex-col items-center mt-8">
        {/* Botão de alternância do modo escuro */}
        <div className="w-full flex justify-end mb-8 mr-28">
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        <div className="container mx-auto p-8 rounded-3xl bg-white dark:bg-black dark:border-black w-[85%] space-y-6">
          {/* Barra de pesquisa */}
          <div className="relative w-full max-w-md mx-auto">
            <SearchInput
              placeholder="Digite o nome do professor..."
            />
          </div>

          <div className="p-8 flex flex-col">
            {/* Passando a lista filtrada de professores para o CardPerson */}
            <CardPerson persons={displayedTeachers} rote="/teacher/feedback/studentsFeedback/studentProfile" />

            {/* Paginação */}
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
        </div>
      </div>
    </div>
  );
}
