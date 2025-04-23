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
  imageUrl?: string;
  nomeDocente: string;
  emailDocente: string;
  dataNascimentoDocente: string;
  telefoneDocente: string;
  identifierCode: string;
  classes: Array<{
    nomeTurma: string;
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

  const fetchDocenteData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const decoded: any = jwtDecode(token);
      const id = decoded?.sub;
      if (!id) throw new Error("ID do usuário não encontrado no token");

      const response = await fetch(`http://localhost:3000/api/teacher/${id}`);
      if (!response.ok)
        throw new Error("Não foi possível carregar os dados do estudante");

      const data = await response.json();
      setDocenteData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocenteData();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="flex flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
          <WelcomeUser />
          <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
        {docenteData && (
          <ProfileInfo
            imageUrl={docenteData.imageUrl}
            name={docenteData.nomeDocente}
            email={docenteData.emailDocente}
            birthDate={docenteData.dataNascimentoDocente}
            phone={docenteData.telefoneDocente}
            registrationNumber={docenteData.identifierCode}
            classes={docenteData.classes}
            password={""}
          />
        )}
      </main>
    </div>
  );
}
