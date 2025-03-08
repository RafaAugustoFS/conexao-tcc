"use client";
import { ProfileCard } from "@/components/ui/alunos/profile-card";
import { OccurrencesTable } from "@/components/ui/alunos/occurrences-table";
import Sidebar from "@/components/layout/sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/alunos/button";
import { Moon, Sun } from "lucide-react";
import CardPerson from "@/components/ui/alunos/cardFeedbackStudent";
const students = [
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

export default function Home() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
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

  const filteredStudent = students.filter((student) =>
    student.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredStudent.length / studentsPerPage);
  const displayedStudents = filteredStudent.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#141414]  flex flex-row">
      <Sidebar />

      <div className="container mx-auto p-4 ">
        <div className="w-full flex flex-row justify-end">
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
        <div className="flex justify-end pb-4"></div>
        <div className="space-y-6 bg-[#FFFFFF] dark:bg-black dark:text-[#ffffffd8] p-8 rounded-2xl max-h-[800px] overflow-y-auto pr scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <ProfileCard
            name="Renata Vieira"
            email="rvieira@gmail.com"
            id="N°11064344B-1"
          />
          <OccurrencesTable />
          <h1 className="text-[#0077FF] font-bold text-[20px] lg:text-[24px] pt-[20px]">
            A importância do seu feedback
          </h1>
          <p className="text-[16px] lg:text-[20px]">
            O feedback dos alunos é essencial para aprimorar a qualidade do
            ensino. Aqui, você pode compartilhar sua experiência em sala de
            aula, destacando o que está funcionando bem e o que pode ser
            melhorado.
          </p>
          <p className="text-[16px] lg:text-[20px]">
            Seus comentários ajudam os professores a ajustar métodos de ensino,
            tornando as aulas mais dinâmicas e eficazes. Seja claro e respeitoso
            em suas respostas, pois sua opinião contribui para um ambiente de
            aprendizado cada vez melhor para todos!
          </p>
          <div className="pt-10">
            <CardPerson persons={displayedStudents} />
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
