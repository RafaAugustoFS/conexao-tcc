"use client"; // Indica que este é um componente do lado do cliente no Next.js

import React, { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e estado
import Table from "@/components/ui/teacher/gradeTableStudents"; // Componente de tabela para exibir notas dos alunos
import Sidebar from "@/components/layout/sidebarTeacher"; // Barra lateral do professor
import { Button } from "@/components/ui/alunos/button"; // Componente de botão personalizado
import { Moon, Sun } from "lucide-react"; // Ícones para o tema claro e escuro
import { useTheme } from "@/components/ThemeProvider"; // Hook para gerenciar o tema (claro/escuro)

// Componente principal da página de notas dos alunos
export default function StudentNotes({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const { darkMode, toggleTheme } = useTheme(); // Estado e função para alternar o tema

  // Efeito para aplicar o tema escuro/claro ao HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      {/* Barra lateral do professor */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="flex-1">
        <div className="p-8">
          {/* Botão para alternar entre tema claro e escuro */}
          <div className="w-full flex justify-end mb-8 mr-28">
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          {/* Tabela de notas dos alunos */}
          <Table />
        </div>
      </main>
    </div>
  );
}