"use client"; // Indica que este é um componente do lado do cliente no Next.js

import MessageList from "@/components/ui/teacher/messageList"; // Componente para exibir a lista de mensagens
import SidebarTeacher from "@/components/layout/sidebarTeacher"; // Barra lateral do professor
import { Button } from "@/components/ui/alunos/button"; // Componente de botão personalizado
import { Sun, Moon } from "lucide-react"; // Ícones para o tema claro e escuro
import { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e estado
import { NoticeCard } from "@/components/ui/teacher/noticeCard"; // Card para exibir avisos
import LateralCalendar from "@/components/ui/lateralCalendar"; // Calendário lateral
import WelcomeMessage from "@/components/ui/welcomeMessage"; // Mensagem de boas-vindas personalizada
import { jwtDecode } from "jwt-decode"; // Biblioteca para decodificar tokens JWT
import { useTheme } from "@/components/ThemeProvider"; // Hook para gerenciar o tema (claro/escuro)

export default function DashboardTeacher() {
  const { darkMode, toggleTheme } = useTheme(); // Estado e função para alternar o tema
  const [docenteName, setDocenteName] = useState<string>("Docente"); // Estado para armazenar o nome do docente
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros, se houver

  // Efeito para aplicar o tema escuro/claro ao HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Efeito para buscar os dados do docente ao carregar o componente
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtém o token do localStorage
        if (!token) throw new Error("Token não encontrado"); // Lança erro se o token não existir

        const decoded: any = jwtDecode(token); // Decodifica o token JWT
        const userId = decoded?.sub; // Obtém o ID do usuário do token
        if (!userId) throw new Error("ID do usuário não encontrado no token"); // Lança erro se o ID não existir

        // Faz uma requisição para buscar os dados do docente
        const response = await fetch(
          `http://localhost:3000/api/teacher/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
            },
          }
        );

        if (!response.ok) throw new Error("Erro ao buscar dados do docente"); // Lança erro se a requisição falhar

        const data = await response.json(); // Converte a resposta para JSON
        setDocenteName(data.nomeDocente || "Docente"); // Atualiza o nome do docente
      } catch (err: any) {
        setError(err.message || "Erro ao buscar nome do docente"); // Define a mensagem de erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchTeacherData(); // Executa a função para buscar os dados
  }, []);

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-[#141414] text-white" : "bg-[#F0F7FF] text-black"
      }`}
    >
      {/* Barra lateral do professor */}
      <SidebarTeacher />

      {/* Conteúdo principal */}
      <main className="flex-1 pl-6 pb-6 pr-6 pt-2">
        {/* Botão para alternar entre tema claro e escuro */}
        <div className="flex flex-col items-end">
        <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        {/* Mensagem de Boas-Vindas */}
        <div className="flex flex-row items-center">
          <WelcomeMessage name={docenteName} />
        </div>

        {/* Card de avisos */}
        <NoticeCard />

        {/* Lista de mensagens */}
        <div className="mt-6 w-full">
          <div className="rounded-xl">
            <MessageList />
          </div>
        </div>
      </main>

      {/* Calendário lateral */}
      <LateralCalendar />
    </div>
  );
}