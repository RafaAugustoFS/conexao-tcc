"use client";
import SidebarInstitution from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/alunos/button";
import CardFeedback from "@/components/ui/institution/cardFeedback";
import FloatingButton from "@/components/ui/institution/FloatingButton";
import SearchInput from "@/components/ui/search";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface TeacherProfile {
  id: number;
  nomeDocente: string;
  classes: Array<{
    nomeTurma: string;
    id: number;
    quantidadeAlunos: number;
  }>;
}

export default function Page() {
  const [docenteData, setDocenteData] = useState<TeacherProfile[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 6;

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
    fetchDocenteData();
  }, []);

  const fetchDocenteData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`http://localhost:3000/api/teacher`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok)
        throw new Error("Não foi possível carregar os dados dos docentes");

      const data = await response.json();
      setDocenteData(data); // Atualiza a lista de professores
    } catch (err: any) {
      setError(err.message); // Define a mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  const filteredTeachers = docenteData
    ? docenteData.filter((docente) =>
        docente.nomeDocente.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  const displayedTeachers = filteredTeachers.slice(
    (currentPage - 1) * teachersPerPage,
    currentPage * teachersPerPage
  );

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
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
            <SearchInput
              placeholder="Digite o nome do professor"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              {displayedTeachers.map((docente) => (
                <CardFeedback
                  key={docente.id}
                  persons={docente.nomeDocente}
                  rote={`/institution/teacher/profile/viewprofile/${docente.id}`}
                />
              ))}

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
            </>
          )}
        </div>
      </main>
      <FloatingButton rote="teacher/profile/createprofile" />
    </div>
  );
}