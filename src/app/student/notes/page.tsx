"use client";

import React, { useEffect, useState } from "react";
import Table from "../../../components/ui/alunos/gradeTable";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/alunos/button";
import { Moon, Sun } from "lucide-react";
import {jwtDecode} from 'jwt-decode';
import { useTheme } from "@/components/ThemeProvider";

// Tipagem para os dados do estudante
interface StudentData {
  nome: string;
  dataNascimentoAluno: string;
  telefoneAluno: string;
  emailAluno: string;
  matriculaAluno: string;
  turma: {
    nomeTurma: string;
    idTUrma: number;
  };
  notas: Array<{
    idNota: number;
    nota: number;
    bimestre: number;
    status: string;
    NomeDiscipline: string;
  }>;
}

export default function Notes({ value, className }: { value: number; className?: string }){
  const { darkMode, toggleTheme } = useTheme(); 
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar as informações do estudante
  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('token');
              if (!token) throw new Error('Token não encontrado');
      
              // 2. Decodifica o token para obter o ID do usuário
              const decoded: any = jwtDecode(token);
              const userId = decoded?.sub; // Supondo que o token contenha { id: 123 }
              if (!userId) throw new Error('ID do usuário não encontrado no token');
      const response = await fetch(`http://localhost:3000/api/student/${userId}`);
      
      if (!response.ok) {
        throw new Error('Não foi possível carregar os dados do estudante');
      }
      
      const data: StudentData = await response.json();
      setStudentData(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Efeito para buscar os dados do estudante quando o componente for montado
  useEffect(() => {
    fetchStudentData();
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('pt-BR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };


  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }
  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1 ">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
            <h1 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#ffffff]">{studentData?.nome}</h1>
            <p className="text-gray-500">{getCurrentDate()}</p>
            </div>
            <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          </div>

          <Table />
        </div>
      </main>
    </div>
  );
}
