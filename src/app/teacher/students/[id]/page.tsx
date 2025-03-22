"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/alunos/button";
import Sidebar from "@/components/layout/sidebarTeacher";
import SearchInput from "@/components/ui/search";
import { useParams } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

interface Student {
  id: number;
  nomeAluno: string;
  identifierCode: number;
}

export default function StudentsPage({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const params = useParams(); // Obtém os parâmetros da URL
  const id = params.id as string; // Extrai o ID da turma da URL
  const [estudante, setEstudante] = useState<Student[]>([]);
  const { darkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10; // Defina o número de alunos por página

  useEffect(() => {
    if (!id) return;

    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/class/students/${id}`
        );
        if (!response.ok) throw new Error("Erro ao buscar alunos");
        const data = await response.json();
        setEstudante(Array.isArray(data.students) ? data.students : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [id]);

  // Filtra os alunos com base na busca
  const filteredStudents = estudante.filter((student) =>
    student.nomeAluno.toLowerCase().includes(search.toLowerCase())
  );

  // Lógica de paginação
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const displayedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-row dark:bg-[#141414]">
      <Sidebar />
      <div className="w-full flex flex-col items-center mt-8">
        <div className="w-full flex justify-end mb-8 mr-28">
          <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
        <div className="container mx-auto p-4 border dark:border-black rounded-lg bg-white w-[85%] p-8 rounded-3xl dark:bg-black">
          <div className="relative w-full max-w-md mx-auto flex justify-center items-center mb-6">
            <SearchInput
              placeholder="Buscar aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            {loading ? (
              <p>Carregando...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
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
                        Perfil
                      </th>
                      <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">
                        Notas
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedStudents.map((student) => (
                      <tr key={student.id} className="border border-blue-500">
                        <td className="p-2 border border-blue-500 dark:text-white">
                          {student.nomeAluno}
                        </td>
                        <td className="p-2 border border-blue-500 dark:text-[#8A8A8A]">
                          {student.identifierCode}
                        </td>
                        <td className="p-2 border border-blue-500 dark:text-white">
                          <Link
                            href={`/teacher/students/profile/${student.id}`}
                            className="text-blue-500 hover:underline"
                          >
                            Ver perfil
                          </Link>
                        </td>
                        <td className="p-2 border border-blue-500 cursor-pointer">
                          <Link
                            href={`/teacher/students/notes/${student.id}`}
                            className="text-blue-500 hover:underline"
                          >
                            Ver Notas
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 mx-1 rounded-md transition ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-blue-500 hover:bg-gray-300"
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
  );
}