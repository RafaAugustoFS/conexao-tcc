"use client";
 
import Chart from "@/components/ui/alunos/chart";
import { Card, CardContent } from "@/components/ui/alunos/card";
import GradeCard from "@/components/ui/alunos/gradeCard";
import MessageList from "@/components/ui/alunos/messageList";
import Sidebar from "@/components/layout/sidebar";
import WelcomeMessage from "@/components/ui/welcomeMessage";
import LateralCalendar from "@/components/ui/lateralCalendar";
import { Button } from "@/components/ui/alunos/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MediaCard } from "@/components/ui/alunos/mediaCard";
 
export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [studentName, setStudentName] = useState<string>("Aluno");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
 
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");
 
        const decoded: any = jwtDecode(token);
        const userId = decoded?.sub;
        if (!userId) throw new Error("ID do usuário não encontrado no token");
 
        const response = await fetch(`http://localhost:3000/api/student/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
 
        if (!response.ok) throw new Error("Erro ao buscar dados do aluno");
 
        const data = await response.json();
        setStudentName(data.nome || "Aluno");
      } catch (err: any) {
        setError(err.message || "Erro ao buscar nome do aluno");
      } finally {
        setLoading(false);
      }
    };
 
    fetchStudentData();
  }, []);
 
  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-[#141414] text-white" : "bg-[#F0F7FF] text-black"
      }`}
    >
      <Sidebar />
 
      <main className="flex-1 pl-6 pb-6 pr-6 pt-2">
        {/* Botão de Modo Escuro */}
        <div className="flex justify-end">
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
 
        {/* Mensagem de Boas-Vindas */}
        <div className="flex flex-row items-center">
          {loading ? (
            <span>Carregando...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <WelcomeMessage name={studentName} />
          )}
        </div>
 
        {/* Cartões de Média e Notas */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <Card>
            <CardContent>
              <MediaCard />
              <Chart />
            </CardContent>
          </Card>
 
          {/* Cartão de Notas */}
          <Card>
            <CardContent>
              <div className="flex flex-row justify-center">
                <GradeCard />
              </div>
            </CardContent>
          </Card>
        </div>
 
        {/* Lista de Mensagens */}
        <div className="mt-6 w-full">
          <div className="rounded-xl">
            <MessageList/>
          </div>
        </div>
      </main>
 
      {/* Barra lateral direita */}
      <LateralCalendar />
    </div>
  );
}
 
 