"use client";
import Sidebar from "@/components/layout/sidebarTeacher";
import { ProfileInfo } from "@/components/ui/teacher/profile";
import WelcomeUser from "@/components/ui/welcomeUser";
import { Button } from "@/components/ui/alunos/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "@/components/ThemeProvider";


interface TeacherProfile {
  imageUrl: string;
  nomeDocente: string; // Nome do professor
  emailDocente: string; // E-mail do professor
  dataNascimentoDocente: string; // Data de nascimento do professor
  telefoneDocente: string; // Telefone do professor
  identifierCode: string; // Código identificador do professor
  classes: Array<{
    nomeTurma: string; // Nome da turma
  }>;
}

export default function User({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const { darkMode, toggleTheme } = useTheme(); 
  const [docenteData, setDocenteData] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função de buscar os dados do estudante
  const fetchDocenteData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const decoded: any = jwtDecode(token); // Decodificação do JWT
      const id = decoded?.sub; // Extraindo o id do usuário do token
      if (!id) throw new Error("ID do usuário não encontrado no token");

      const response = await fetch(`http://localhost:3000/api/teacher/${id}`);
      if (!response.ok)
        throw new Error("Não foi possível carregar os dados do estudante");

      const data = await response.json();
      setDocenteData(data); // Setando os dados do estudante
    } catch (err: any) {
      setError(err.message); // Tratamento de erro
    } finally {
      setLoading(false); // Finalizando o carregamento
    }
  };

  // Chama a função de fetch quando o componente for montado
  useEffect(() => {
    fetchDocenteData(); // Chamando a função para carregar os dados
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <WelcomeUser name={docenteData?.nomeDocente || "Nao achou"} />
            </div>
            <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          </div>
          {docenteData && (
            <ProfileInfo
              imageUrl={docenteData.imageUrl || "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?t=st=1738800543~exp=1738804143~hmac=5400a6f0c02663ed6f91ff172c490ed49dbd456d03bed9e4c98b2aed06b0dfdb&w=826"}
              name={docenteData.nomeDocente} // Nome do professor
              email={docenteData.emailDocente} // E-mail do professor
              birthDate={docenteData.dataNascimentoDocente} // Data de nascimento do professor
              phone={docenteData.telefoneDocente} // Telefone do professor
              registrationNumber={docenteData.identifierCode} // Código identificador do professor
              classes={docenteData.classes} // Lista de turmas (vazia neste exemplo)
              password={""} // Senha (vazia neste exemplo)
            />
          )}
        </div>
      </main>
    </div>
  );
}