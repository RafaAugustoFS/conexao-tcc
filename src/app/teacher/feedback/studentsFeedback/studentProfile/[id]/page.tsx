"use client";
// Importações de componentes e bibliotecas
import Sidebar from "@/components/layout/sidebarTeacher";
import { ProfileCard } from "@/components/ui/alunos/profile-card"; // Componente de perfil do aluno
import Occurrence from "@/components/ui/teacher/ocurrence"; // Componente de ocorrências
import { Button } from "@/components/ui/alunos/button"; // Componente de botão
import { useEffect, useState } from "react"; // Hooks do React
import { Moon, Sun } from "lucide-react"; // Ícones para tema claro/escuro
import TablePerformance from "@/components/ui/tablePerfomance"; // Tabela de desempenho
import { useParams } from "next/navigation"; // Hook para acessar parâmetros da URL
import FeedbackForm from "@/components/ui/teacher/questions"; // Formulário de feedback
import { useTheme } from "@/components/ThemeProvider"; // Contexto de tema

// Interface para tipagem dos dados do aluno
interface StudentProfile {
  nome: string;
  emailAluno: string;
  dataNascimentoAluno: string;
  telefoneAluno: string;
  matriculaAluno: string;
}

// Componente principal da página do professor/aluno
export default function User({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  // Obtém os parâmetros da URL (no caso, o ID do aluno)
  const params = useParams();
  const id = params.id as string;
  
  // Contexto e estado para controle do tema (claro/escuro)
  const { darkMode, toggleTheme } = useTheme();
  
  // Estados para armazenar dados do aluno, loading e erros
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar dados do estudante na API
  const fetchStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/student/${id}`);
      console.log(id);
      
      // Verifica se a resposta da API foi bem-sucedida
      if (!response.ok)
        throw new Error("Não foi possível carregar os dados do estudante");

      const data = await response.json();
      console.log(data);
      setStudentData(data); // Atualiza o estado com os dados do aluno
    } catch (err: any) {
      setError(err.message); // Armazena mensagem de erro caso ocorra
    } finally {
      setLoading(false); // Finaliza o estado de loading
    }
  };

  // Efeito para buscar dados do aluno quando o componente é montado
  useEffect(() => {
    fetchStudentData();
  }, []);

  // Efeito para aplicar o tema selecionado ao HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Renderização do componente
  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      {/* Sidebar lateral */}
      <Sidebar />
      
      {/* Conteúdo principal */}
      <main className="flex-1">
        <div className="p-8">
          {/* Cabeçalho com botão de alternar tema */}
          <div className="flex items-center justify-between mb-8 max-2xl:mt-5">
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
          
          {/* Container principal com scroll */}
          <div className="bg-white dark:bg-black rounded-lg shadow-sm p-8 space-y-6 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-track-black">
            {/* Componente de perfil do aluno */}
            <ProfileCard
              studentData={studentData}
              loading={loading}
              error={error}
            />
            
            {/* Componentes de tabela de desempenho, feedback e ocorrências */}
            <TablePerformance />
            <FeedbackForm />
            <Occurrence />
          </div>
        </div>
      </main>
    </div>
  );
}