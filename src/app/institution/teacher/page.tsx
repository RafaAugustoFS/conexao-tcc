"use client";
import SidebarInstitution from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/alunos/button";
import CardFeedback from "@/components/ui/institution/cardFeedback";
import FloatingButton from "@/components/ui/institution/FloatingButton";
import SearchInput from "@/components/ui/search";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function page() {
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
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 6;

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
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414] ">
      <SidebarInstitution />
      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-end mb-8 w-full">
            <Button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>

        <div className="w-[80%] mx-auto bg-white rounded-[20px] dark:bg-black p-10">
          <div className="w-full flex flex-row justify-center items-center mb-8">
            <SearchInput placeholder="Digite o nome do professor" />
          </div>
          <CardFeedback
            persons={displayedTeachers}
            rote="/institution/teacher/profile/viewprofile"
          />

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
      </main>
      <FloatingButton rote="teacher/profile/createprofile"/>
    </div>
  );
}
