"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/alunos/button";
import Sidebar from "@/components/layout/sidebarTeacher";
import SearchInput from "@/components/ui/search";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";


interface Student {
  nomeAluno: any;
  id: number;
  nomeTurma: string;
  periodoTurma: string;
  students: Array<{
    nomeAluno: string;
    id: number;
    identifierCode: number;
  }>;
}

export default function TeacherList({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const params = useParams();
  const id = params.id as string;
  const [estudante, setEstudante] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
  const { darkMode, toggleTheme } = useTheme(); 

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (!id) return;

    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/class/students/${id}`);
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

  const filteredStudents = estudante.filter((student) =>
    student.nomeAluno.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const displayedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex dark:bg-[#141414]">
      <Sidebar />
      <div className="w-full flex flex-col items-center mt-8">
        <div className="w-full flex justify-end mb-8 mr-28">
        <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        <div className="container mx-auto p-8 rounded-3xl bg-white dark:bg-black dark:border-black w-[85%] space-y-6">
          <div className="relative w-full max-w-md mx-auto">
            <SearchInput
              placeholder="Digite o nome do aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="p-8 flex flex-col">
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2">
              {displayedStudents.map((student, index) => (
                <Link key={index} href={`/teacher/feedback/studentsFeedback/studentProfile/${student.id}`}>
                  <div className="flex flex-col items-center p-4 rounded-lg shadow-md bg-[#F0F7FF] dark:bg-[#141414] dark:text-white border-[#F0F7FF] dark:border-[#141414] cursor-pointer">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                      🎓
                    </div>
                    <span className="font-medium">{student.nomeAluno}</span>
                    <span className="text-green-600">Ativo(a)</span>
                  </div>
                </Link>
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
        </div>
      </div>
    </div>
  );
}