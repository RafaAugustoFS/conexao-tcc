"use client"; // Indica que este é um componente do lado do cliente no Next.js

import { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e estado
import { Moon, Sun } from "lucide-react"; // Ícones para o tema claro e escuro
import { Button } from "@/components/ui/alunos/button"; // Componente de botão personalizado
import Sidebar from "@/components/layout/sidebarTeacher"; // Barra lateral do professor
import SearchInput from "@/components/ui/search"; // Componente de input de busca
import { useParams } from "next/navigation"; // Hook para acessar parâmetros da URL
import Link from "next/link"; // Componente para navegação entre páginas
import { useTheme } from "@/components/ThemeProvider"; // Hook para gerenciar o tema (claro/escuro)

// Interface para definir a estrutura dos dados do aluno
interface Student {
  nomeAluno: any; // Nome do aluno (pode ser de qualquer tipo)
  id: number; // ID do aluno
  nomeTurma: string; // Nome da turma
  periodoTurma: string; // Período da turma
  students: Array<{
    nomeAluno: string; // Nome do aluno
    id: number; // ID do aluno
    identifierCode: number; // Código identificador do aluno
  }>;
}

// Componente principal da página de alunos para feedback
export default function StudentsForFeedback({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const params = useParams(); // Hook para acessar os parâmetros da URL
  const id = params.id as string; // Extrai o ID da turma da URL
  const [estudante, setEstudante] = useState<Student[]>([]); // Estado para armazenar os dados dos alunos
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros, se houver
  const [search, setSearch] = useState(""); // Estado para armazenar o termo de busca
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual da paginação
  const studentsPerPage = 6; // Número de alunos exibidos por página
  const { darkMode, toggleTheme } = useTheme(); // Estado e função para alternar o tema

  // Efeito para aplicar o tema escuro/claro ao HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Efeito para resetar a página atual ao realizar uma busca
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Efeito para buscar os dados dos alunos ao carregar o componente
  useEffect(() => {
    if (!id) return; // Retorna se o ID não estiver disponível

    const fetchStudents = async () => {
      try {
        // Faz uma requisição para buscar os alunos da turma
        const response = await fetch(`http://localhost:3000/api/class/students/${id}`);
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

  // Filtra os alunos com base no termo de busca
  const filteredStudents = estudante.filter((student) =>
    student.nomeAluno.toLowerCase().includes(search.toLowerCase())
  );

  // Calcula o número total de páginas para a paginação
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Seleciona os alunos a serem exibidos na página atual
  const displayedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  // Exibe uma mensagem de erro caso ocorra algum problema
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex dark:bg-[#141414]">
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
        <div className="container mx-auto p-8 rounded-3xl bg-white dark:bg-black dark:border-black w-[85%] space-y-6">
          {/* Input de busca */}
          <div className="relative w-full max-w-md mx-auto">
            <SearchInput
              placeholder="Digite o nome do aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Lista de alunos */}
          <div className="p-8 flex flex-col">
            {/* Grid para exibir os alunos */}
            <div className="grid grid-cols-3 gap-6">
              {displayedStudents.map((student, index) => (
                <Link key={index} href={`/teacher/feedback/studentsFeedback/studentProfile/${student.id}`}>
                  {/* Card do aluno */}
                  <div className="flex flex-col items-center p-4 rounded-lg shadow-md bg-[#F0F7FF] dark:bg-[#141414] dark:text-white border-[#F0F7FF] dark:border-[#141414] cursor-pointer">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                      🎓
                    </div>
                    <span className="font-medium">{student.nomeAluno}</span>
                    <span className="text-green-600">Ativo(a)</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 mx-1 rounded-md transition ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white dark:text-black"
                        : "bg-[#F0F7FF] text-blue-500 hover:bg-gray-300 dark:bg-[#141414]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}