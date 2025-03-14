"use client";

import { useEffect, useState } from "react";
import { ArrowDownCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/alunos/button";
import Sidebar from "@/components/layout/sidebarInstitution";
import SearchInput from "@/components/ui/search";
import { useParams } from "next/navigation";
import FloatingButton from "@/components/ui/institution/FloatingButton";

interface Student {
  id: number;
  nomeTurma: string;
  periodoTurma: string;
  students:Array<{
    nomeAluno: string;
    id: number;
    identifierCode: number;
  }>
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
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className={`min-h-screen bg-[#F0F7FF] flex flex-row dark:bg-[#141414]`}>
      <Sidebar />
      <div className="w-full flex flex-col items-center mt-8">
        <div className="w-full flex justify-end mb-8 mr-28">
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
        <div className="container mx-auto p-4 border dark:border-black rounded-lg bg-[#FFFFFF] w-[85%] p-8 pr-15 pt-20 pb-20 space-y-2 rounded-3xl dark:bg-black">
          <div className="relative w-full max-w-md mx-auto flex justify-center items-center mb-6">
            <SearchInput placeholder="Buscar aluno..." />
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
                      <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">Nome do aluno</th>
                      <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">Nº da Matrícula</th>
                      <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">Perfil</th>
                      <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estudante.map((student) => (
                      <tr key={student.id} className="border border-blue-500">
                        <td className="p-2 border border-blue-500 dark:text-white">{student.nomeAluno}</td>
                        <td className="p-2 border border-blue-500 dark:text-[#8A8A8A]">{student.identifierCode}</td>
                        <td className="p-2 border border-blue-500 dark:text-white">
                          <a href={`/institution/class/viewclass/profile/${student.id}`} className="text-blue-500">Ver perfil</a>
                        </td>
                        <td className="p-2 border border-blue-500 cursor-pointer">
                          <a href={`/institution/student/notes/${student.id}`} className="text-blue-500">Ver Notas</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <FloatingButton rote={`../../student/createStudent/${id}`} />
    </div>
  );
}