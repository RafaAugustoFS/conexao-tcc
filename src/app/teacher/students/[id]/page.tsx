"use client"; // Indica que este é um componente do lado do cliente no Next.js

import { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e estado
import { ArrowDownCircle, Moon, Sun } from "lucide-react"; // Ícones para o tema claro e escuro
import { Button } from "@/components/ui/alunos/button"; // Componente de botão personalizado
import Sidebar from "@/components/layout/sidebarTeacher"; // Barra lateral do professor
import SearchInput from "@/components/ui/search"; // Componente de input de busca
import { useParams } from "next/navigation"; // Hook para acessar parâmetros da URL
import { useTheme } from "@/components/ThemeProvider"; // Hook para gerenciar o tema (claro/escuro)

// Interface para definir a estrutura dos dados do aluno
interface Student {
  id: number; // ID do aluno
  nomeTurma: string; // Nome da turma
  periodoTurma: string; // Período da turma
  students: Array<{
    nomeAluno: string; // Nome do aluno
    id: number; // ID do aluno
    identifierCode: number; // Código identificador do aluno
  }>;
}

// Componente principal da página de alunos
export default function StudentsPage({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const params = useParams(); // Hook para acessar os parâmetros da URL
  const id = params.id as string; // Extrai o ID da turma da URL
  const [estudante, setEstudante] = useState<Student[]>([]); // Estado para armazenar os dados dos alunos
  const { darkMode, toggleTheme } = useTheme(); // Estado e função para alternar o tema
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros, se houver

  // Efeito para buscar os dados dos alunos ao carregar o componente
  useEffect(() => {
    if (!id) return; // Retorna se o ID não estiver disponível

    const fetchStudents = async () => {
      try {
        // Faz uma requisição para buscar os alunos da turma
        const response = await fetch(
          `http://localhost:3000/api/class/students/${id}`
        );
        if (!response.ok) throw new Error("Erro ao buscar alunos"); // Lança erro se a requisição falhar
        const data = await response.json(); // Converte a resposta para JSON
        setEstudante(Array.isArray(data.students) ? data.students : []); // Atualiza os dados dos alunos
      } catch (err: any) {
        setError(err.message); // Define a mensagem de erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchStudents(); // Executa a função para buscar os dados
  }, [id]);

  // Efeito para aplicar o tema escuro/claro ao HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen bg-[#F0F7FF] flex flex-row dark:bg-[#141414]`}
    >
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
        <div className="container mx-auto p-4 border dark:border-black rounded-lg bg-[#FFFFFF] w-[85%] p-8 pr-15 pt-20 pb-20 space-y-2 rounded-3xl dark:bg-black">
          {/* Input de busca */}
          <div className="relative w-full max-w-md mx-auto flex justify-center items-center mb-6">
            <SearchInput placeholder="Buscar aluno..." />
          </div>

          {/* Tabela de alunos */}
          <div className="overflow-x-auto overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            {loading ? (
              <p>Carregando...</p> // Exibe uma mensagem de carregamento
            ) : error ? (
              <p className="text-red-500">{error}</p> // Exibe uma mensagem de erro
            ) : (
              <div className="overflow-x-auto w-full">
                {/* Tabela de alunos */}
                <table className="w-full text-left border-collapse border border-[#1A85FF] dark:border-black">
                  <thead>
                    <tr className="bg-[#1A85FF] text-white">
                      <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">
                        Nome do aluno
                      </th>
                      <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">
                        Nº da Matrícula
                      </th>
                      <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">
                        Média(%)
                      </th>
                      <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">
                        Notas
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mapeia os alunos e exibe cada um em uma linha da tabela */}
                    {estudante.map((student) => (
                      <tr key={student.id} className="border border-blue-500">
                        <td className="p-2 border border-blue-500 dark:text-white">
                          {student.nomeAluno}
                        </td>
                        <td className="p-2 border border-blue-500 dark:text-[#8A8A8A]">
                          {student.identifierCode}
                        </td>
                        <td className="p-2 border border-blue-500 dark:text-white"></td>
                        <td className="p-2 border border-blue-500 cursor-pointer">
                          {/* Link para a página de notas do aluno */}
                          <a
                            href={`/teacher/students/notes/${student.id}`}
                            className="text-blue-500"
                          >
                            Ver Notas
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
