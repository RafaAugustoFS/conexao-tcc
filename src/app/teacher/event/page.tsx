"use client"; // Indica que este é um componente do lado do cliente no Next.js

// Importações de componentes e bibliotecas
import Sidebar from "@/components/layout/sidebarTeacher"; // Barra lateral do professor
import BiggerCalendar from "../../../components/ui/alunos/biggerCalendar"; // Componente de calendário
import { Button } from "@/components/ui/alunos/button"; // Componente de botão personalizado
import { Moon, Sun } from "lucide-react"; // Ícones para tema claro/escuro
import { useEffect } from "react"; // Hook do React para efeitos colaterais
import { EventSidebar } from "@/components/ui/alunos/event-sidebar"; // Barra lateral de eventos
import { useTheme } from "@/components/ThemeProvider"; // Provedor de tema para dark mode

// Componente principal da página de Eventos
export default function Event() {
  // Obtém o estado do tema e a função para alternar entre dark/light mode
  const { darkMode, toggleTheme } = useTheme();

  // Efeito para aplicar o tema ao carregar a página e quando darkMode muda
  useEffect(() => {
    // Adiciona/remove a classe 'dark' no elemento raiz do documento
    document.documentElement.classList.toggle("dark", darkMode);
    // Armazena a preferência de tema no localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Renderização do componente
  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414] ">
      {/* Componente da barra lateral principal */}
      <Sidebar />
      
      {/* Conteúdo principal da página */}
      <main className="flex-1">
        <div className="p-2">
          {/* Container do botão de tema */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-full flex justify-end mb-8 mr-10">
              {/* Botão para alternar entre tema claro e escuro */}
              <Button onClick={toggleTheme}>
                {/* Exibe ícone de sol ou lua dependendo do tema atual */}
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Container do calendário */}
        <div className="max-w-[800px] max-h-[720px] mx-auto bg-white rounded-[20px] p-1 dark:bg-black">
          {/* Componente de calendário (versão ampliada) */}
          <BiggerCalendar />
        </div>
      </main>
      
      {/* Barra lateral de eventos */}
      <EventSidebar />
    </div>
  );
}