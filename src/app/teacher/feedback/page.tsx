"use client"; // Indica que este é um componente do lado do cliente no Next.js

import { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e estado
import { Moon, Sun } from "lucide-react"; // Ícones para o tema claro e escuro
import { Button } from "@/components/ui/alunos/button"; // Componente de botão personalizado
import Sidebar from "@/components/layout/sidebarTeacher"; // Barra lateral do professor
import SearchInput from "@/components/ui/search"; // Componente de input de busca
import { jwtDecode } from "jwt-decode"; // Biblioteca para decodificar tokens JWT
import { useRouter } from "next/navigation"; // Hook para navegação programática
import { useTheme } from "@/components/ThemeProvider"; // Hook para gerenciar o tema (claro/escuro)

// Interface para definir a estrutura dos dados do professor
interface TeacherProfile {
  nomeDocente: string; // Nome do docente
  classes: Array<{
    nomeTurma: string; // Nome da turma
    id: number; // ID da turma
    quantidadeAlunos: number; // Quantidade de alunos na turma
  }>;
}

// Componente principal da página de feedback dos alunos
export default function Feedback({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [docenteData, setDocenteData] = useState<TeacherProfile | null>(null); // Estado para armazenar os dados do docente
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros, se houver
  const { darkMode, toggleTheme } = useTheme(); // Estado e função para alternar o tema

  // Função para buscar os dados do docente
  const fetchDocenteData = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtém o token do localStorage
      if (!token) throw new Error("Token não encontrado"); // Lança erro se o token não existir

      const decoded: any = jwtDecode(token); // Decodifica o token JWT
      const id = decoded?.sub; // Obtém o ID do usuário do token
      if (!id) throw new Error("ID do usuário não encontrado no token"); // Lança erro se o ID não existir

      // Faz uma requisição para buscar os dados do docente
      const response = await fetch(
        `http://localhost:3000/api/teacher/classes/${id}`
      );
      if (!response.ok)
        throw new Error("Não foi possível carregar os dados do estudante"); // Lança erro se a requisição falhar

      const data = await response.json(); // Converte a resposta para JSON
      setDocenteData(data); // Atualiza os dados do docente
    } catch (err: any) {
      setError(err.message); // Define a mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Efeito para buscar os dados do docente ao carregar o componente
  useEffect(() => {
    fetchDocenteData(); // Executa a função para buscar os dados
  }, []);

  // Efeito para aplicar o tema escuro/claro ao HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const router = useRouter(); // Hook para navegação programática

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-row dark:bg-[#141414]">
      {/* Barra lateral do professor */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="w-full flex flex-col items-center mt-8">
        {/* Botão para alternar entre tema claro e escuro */}
        <div className="w-full flex justify-end mb-8 mr-28">
          <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        {/* Container principal */}
        <div className="container mx-auto p-4 border rounded-lg bg-[#FFFFFF] w-[85%] h-[85%] p-8 pr-15 pt-20 pb-20 space-y-2 rounded-3xl dark:bg-black dark:border-black">
          {/* Input de busca */}
          <div className="relative w-full max-w-md mx-auto flex justify-center items-center mb-6">
            <SearchInput placeholder="Buscar turma..." />
          </div>

          {/* Exibição condicional: carregando, erro ou lista de turmas */}
          {loading ? (
            <p className="text-center text-gray-700 dark:text-white">
              Carregando...
            </p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Mapeia as turmas e exibe cada uma em um card */}
              {docenteData?.classes.map((turma) => (
                <div
                  key={turma.id}
                  className="bg-blue-50 dark:bg-[#141414] p-4 rounded-lg shadow"
                >
                  {/* Nome da turma e ID */}
                  <h3 className="font-bold text-lg dark:text-white">
                    {turma.nomeTurma}{" "}
                    <span className="text-gray-500 text-sm dark:text-[#8A8A8A]">
                      Nº{turma.id}
                    </span>
                  </h3>

                  {/* Quantidade de alunos na turma */}
                  <p className="text-gray-700 dark:text-white">
                    {turma.quantidadeAlunos} alunos ativos
                  </p>

                  {/* Botão para visualizar o feedback da turma */}
                  <a href={`/teacher/feedback/studentsFeedback/${turma.id}`}>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                      Visualizar turma
                    </button>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
