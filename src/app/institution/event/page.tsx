"use client";
// Importações de bibliotecas e componentes necessários
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/sidebarInstitution";
import BiggerCalendar from "@/components/ui/institution/biggerCalendar";
import { Button } from "@/components/ui/alunos/button";
import { Moon, Plus, Sun } from "lucide-react";
import { EventSidebar } from "@/components/ui/alunos/event-sidebar";
import Modal from "@/components/modals/modalFloatingButton";
import { useTheme } from "@/components/ThemeProvider";

// Componente principal da página de Eventos
export default function Event() {
  // Gerenciamento do tema (claro/escuro)
  const { darkMode, toggleTheme } = useTheme(); 
  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para forçar recarregamento dos eventos
  const [refreshKey, setRefreshKey] = useState(0);

  // Efeito para aplicar o tema selecionado ao HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Função para obter a data atual formatada
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("pt-BR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Função chamada quando um novo evento é criado (para atualizar a lista)
  const handleEventCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };
  
  // Renderização do componente
  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      {/* Barra lateral */}
      <Sidebar />
      
      {/* Conteúdo principal */}
      <main className="flex-1">
        <div className="p-8 max-2xl:pt-14">
          {/* Cabeçalho com título, data e botão de tema */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-blue-500">
                Eventos
              </h1>
              <p className="text-gray-500">{getCurrentDate()}</p>
            </div>
            {/* Botão para alternar entre tema claro/escuro */}
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>

        {/* Container do calendário */}
        <div className="flex flex-row max-w-[1000px] mx-auto bg-white rounded-[20px] p-1 dark:bg-black">
          {/* Componente do calendário */}
          <BiggerCalendar onEventCreated={handleEventCreated} />
        </div>
      </main>
      
      {/* Barra lateral de eventos (atualizada quando refreshKey muda) */}
      <EventSidebar key={refreshKey} />
      
      {/* Modal (não está sendo usado atualmente, pois isModalOpen é sempre false) */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}