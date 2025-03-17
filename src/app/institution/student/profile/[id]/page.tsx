"use client";
import Sidebar from "@/components/layout/sidebarInstitution";
import { ProfileInfo } from "@/components/ui/alunos/profile";
import { Button } from "@/components/ui/alunos/button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Moon, Pencil, Sun, Trash } from "lucide-react";
import Link from "next/link";
import DeleteModal from "@/components/modals/modelDelete";
import { useTheme } from "@/components/ThemeProvider";


interface StudentProfile {
  nome: string;
  emailAluno: string;
  dataNascimentoAluno: string;
  telefoneAluno: string;
  matriculaAluno: string;
}

export default function User({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const params = useParams();
  const { darkMode, toggleTheme } = useTheme();
  const id = params.id as string; // Extrai o ID da turma da URL
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função de buscar os dados do estudante
  const fetchStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/student/${id}`);
      if (!response.ok) throw new Error("Não foi possível carregar os dados do estudante");

      const data = await response.json();
      setStudentData(data); // Setando os dados do estudante
    } catch (err: any) {
      setError(err.message); // Tratamento de erro
    } finally {
      setLoading(false); // Finalizando o carregamento
    }
  };

  // Chama a função de fetch quando o componente for montado
  useEffect(() => {
    fetchStudentData(); // Chamando a função para carregar os dados
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-end mb-8 w-full">
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
          <div className="bg-white dark:bg-black rounded-lg shadow-sm p-3">
            {studentData && (
              <ProfileInfo
                name={studentData.nome}
                email={studentData.emailAluno}
                birthDate={studentData.dataNascimentoAluno}
                phone={studentData.telefoneAluno}
                registrationNumber={studentData.matriculaAluno}
              />
            )}
            <div className="w-full flex flex-row justify-end space-x-4 pr-8">
              <Link href={`../../../student/editprofile/${id}`}>
                <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                  <Pencil size={20} />
                </button>
              </Link>
              <button
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => setIsModalOpen(true)}
              >
                <Trash size={20} />
              </button>
            </div>
            <div className="flex justify-center w-full">
              <Link className="text-[#4184ff] hover:underline" href="./feedback">Ver Mais</Link>
            </div>
          </div>
        </div>
      </main>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          console.log("Item excluído");
        }}
      />
    </div>
  );
}