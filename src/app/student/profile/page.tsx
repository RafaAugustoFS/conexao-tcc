"use client";
import Sidebar from "@/components/layout/sidebar";
import { ProfileInfo } from "@/components/ui/alunos/profile";
import WelcomeUser from "@/components/ui/welcomeUser";
import { Button } from "@/components/ui/alunos/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "@/components/ThemeProvider"; // Importe o hook useTheme

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

 
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const { darkMode, toggleTheme } = useTheme(); // Use o hook useTheme
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Data inválida"; // Caso a data seja inválida
    }
    const day = String(date.getDate()).padStart(2, "0"); // Dia com 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês com 2 dígitos
    const year = date.getFullYear(); // Ano com 4 dígitos
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
  };


  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

    // Função de buscar os dados do estudante
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");
 
        const decoded: any = jwtDecode(token); // Decodificação do JWT
        const id = decoded?.sub; // Extraindo o id do usuário do token
        if (!id) throw new Error("ID do usuário não encontrado no token");
 
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
 
  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <WelcomeUser name={studentData?.nome || ""} />
            <div className="flex justify-end">
          <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
          </div>
          {studentData && (
            <ProfileInfo
            name={studentData.nome}
            email={studentData.emailAluno}
            birthDate={formatDate(studentData.dataNascimentoAluno)}
            phone={studentData.telefoneAluno} 
            registrationNumber={studentData.matriculaAluno}
          />
          )}
        </div>
      </main>
    </div>
  );
}