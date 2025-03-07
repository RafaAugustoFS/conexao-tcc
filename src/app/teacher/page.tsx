"use client";

import { Card } from "@/components/ui/alunos/card";
import MessageList from "@/components/ui/teacher/messageList";
import SidebarTeacher from "@/components/layout/sidebarTeacher";
import { Button } from "@/components/ui/alunos/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Class } from "@/components/ui/teacher/class";
import { NoticeCard } from "@/components/ui/teacher/noticeCard";
import LateralCalendar from "@/components/ui/lateralCalendar";
import WelcomeMessage from "@/components/ui/welcomeMessage";

import { jwtDecode } from "jwt-decode";
import { MediaCard } from "@/components/ui/alunos/mediaCard";
 
export default function DashboardTeacher() {
  const [darkMode, setDarkMode] = useState(false);
  const [docenteName, setDocenteName] = useState<string>("Docente");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [media, setMedia] = useState<number>(0); // Estado para armazenar a média
 
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
 
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");
 
        const decoded: any = jwtDecode(token);
        const userId = decoded?.sub;
        if (!userId) throw new Error("ID do usuário não encontrado no token");
 
        const response = await fetch(`http://localhost:3000/api/teacher/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
 
        if (!response.ok) throw new Error("Erro ao buscar dados do aluno");
 
        const data = await response.json();
        setDocenteName(data.nomeDocente || "Aluno");
      } catch (err: any) {
        setError(err.message || "Erro ao buscar nome do docente");
      } finally {
        setLoading(false);
      }
    };
 
    fetchTeacherData();
  }, []);

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-[#141414] text-white" : "bg-[#F0F7FF] text-black"
      }`}
    >
      <SidebarTeacher />
      <main className="flex-1 pl-6 pb-6 pr-6 pt-2">
        <div className="flex flex-col items-end">
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        {/* Mensagem de Boas-Vindas */}
        <div className="flex flex-row items-center">
          <WelcomeMessage name={docenteName} />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Card turma */}
          <Card>
            <h2 className="text-blue-600 font-semibold mb-4">Turmas</h2>
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
              <Class />
            </div>
          </Card>
          {/* Card aviso */}
          <Card>
            <h2 className="text-blue-600 font-semibold mb-4">Aviso</h2>
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
              <NoticeCard />
            </div>
          </Card>
        </div>
        {/* Card avisos */}
        <div className="mt-6 w-full">
          <div className="rounded-xl">
            <MessageList value={0} />
          </div>
        </div>
      </main>
      {/* Barra lateral direita */}
      <LateralCalendar />
    </div>
  );
}
