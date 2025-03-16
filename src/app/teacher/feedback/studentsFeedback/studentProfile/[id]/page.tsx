"use client";
import Sidebar from "@/components/layout/sidebarTeacher";
import { ProfileInfo } from "@/components/ui/teacher/profileStudent";
import Occurrence from "@/components/ui/teacher/ocurrence";
import { Button } from "@/components/ui/alunos/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import TablePerformance from "@/components/ui/tablePerfomance";
import { useParams } from "next/navigation";
import FeedbackForm from "@/components/ui/teacher/questions";
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
  const id = params.id as string;
  const { darkMode, toggleTheme } = useTheme(); 
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função de buscar os dados do estudante
  const fetchStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/student/${id}`); //aqui
      console.log(id);
      if (!response.ok)
        throw new Error("Não foi possível carregar os dados do estudante");

      const data = await response.json();
      console.log(data);
      setStudentData(data); // Setando os dados do estudante
    } catch (err: any) {
      setError(err.message); // Tratamento de erro
    } finally {
      setLoading(false); // Finalizando o carregamento
    }
  };

  // Chama a função de fetch quando o componente for montado
  useEffect(() => {
    fetchStudentData(); // Chamando a função para carregar os dados  //aqui
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
          <div className="flex items-center justify-between mb-8 ">
          <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          </div>
          <div className="bg-white dark:bg-black rounded-lg shadow-sm p-8 space-y-6 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-track-black">
            {studentData && (
              <ProfileInfo
                name={studentData.nome}
                email={studentData.emailAluno}
                birthDate={studentData.dataNascimentoAluno}
                phone={studentData.telefoneAluno}
                registrationNumber={studentData.matriculaAluno}
              />
            )}
            <TablePerformance />
            <FeedbackForm />
            <Occurrence />
          </div>
        </div>
      </main>
    </div>
  );
}
