"use client"; // Indica que este é um componente do lado do cliente no Next.js

import Sidebar from "@/components/layout/sidebarTeacher"; // Barra lateral do professor
import { ProfileInfo } from "@/components/ui/teacher/profileStudent"; // Componente para exibir informações do perfil do aluno
import Occurrence from "@/components/ui/teacher/ocurrence"; // Componente para exibir ocorrências
import { Button } from "@/components/ui/alunos/button"; // Componente de botão personalizado
import { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e estado
import { Moon, Sun } from "lucide-react"; // Ícones para o tema claro e escuro
import TablePerformance from "@/components/ui/tablePerfomance"; // Componente para exibir a tabela de desempenho
import { useParams } from "next/navigation"; // Hook para acessar parâmetros da URL
import FeedbackForm from "@/components/ui/teacher/questions"; // Componente para exibir o formulário de feedback
import { useTheme } from "@/components/ThemeProvider"; // Hook para gerenciar o tema (claro/escuro)

// Interface para definir a estrutura dos dados do perfil do aluno
interface StudentProfile {
  nome: string; // Nome do aluno
  emailAluno: string; // E-mail do aluno
  dataNascimentoAluno: string; // Data de nascimento do aluno
  telefoneAluno: string; // Telefone do aluno
  matriculaAluno: string; // Número de matrícula do aluno
}

// Componente principal da página de perfil do aluno
export default function StudentsProfile({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const params = useParams(); // Hook para acessar os parâmetros da URL
  const id = params.id as string; // Extrai o ID do aluno da URL
  const { darkMode, toggleTheme } = useTheme(); // Estado e função para alternar o tema
  const [studentData, setStudentData] = useState<StudentProfile | null>(null); // Estado para armazenar os dados do aluno
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros, se houver

  // Função para buscar os dados do aluno
  const fetchStudentData = async () => {
    try {
      // Faz uma requisição para buscar os dados do aluno
      const response = await fetch(`http://localhost:3000/api/student/${id}`);
      console.log(id); // Log do ID do aluno (para depuração)
      if (!response.ok)
        throw new Error("Não foi possível carregar os dados do estudante"); // Lança erro se a requisição falhar

      const data = await response.json(); // Converte a resposta para JSON
      console.log(data); // Log dos dados do aluno (para depuração)
      setStudentData(data); // Atualiza os dados do aluno
    } catch (err: any) {
      setError(err.message); // Define a mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Efeito para buscar os dados do aluno ao carregar o componente
  useEffect(() => {
    fetchStudentData(); // Executa a função para buscar os dados
  }, []);

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
          <div className="flex items-center justify-between mb-8">
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          {/* Container principal com informações do aluno */}
          <div className="bg-white dark:bg-black rounded-lg shadow-sm p-8 space-y-6 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-track-black">
            {/* Exibe as informações do perfil do aluno, se disponíveis */}
            {studentData && (
              <ProfileInfo
                name={studentData.nome} // Nome do aluno
                email={studentData.emailAluno} // E-mail do aluno
                birthDate={studentData.dataNascimentoAluno} // Data de nascimento do aluno
                phone={studentData.telefoneAluno} // Telefone do aluno
                registrationNumber={studentData.matriculaAluno} // Número de matrícula do aluno
              />
            )}

            {/* Tabela de desempenho do aluno */}
            <TablePerformance />

            {/* Formulário de feedback */}
            <FeedbackForm />

            {/* Ocorrências relacionadas ao aluno */}
            <Occurrence />
          </div>
        </div>
      </main>
    </div>
  );
}