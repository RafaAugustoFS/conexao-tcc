"use client";

import { useEffect, useState } from "react";
import { ArrowDownCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/alunos/button";
import Sidebar from "@/components/layout/sidebarTeacher";
import SearchInput from "@/components/ui/search";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

interface TeacherProfile {
  nomeDocente: string;
  classes: Array<{
    nomeTurma: string;
    id: number;
    quantidadeAlunos: number;
  }>;
}

interface Classes {
  classes?: Array<{
    nomeTurma: string;
    id: number;
    quantidadeAlunos: number;
  }>;
}

export default function CheckInEmocional({ classes = [] }: Classes) {
  const { darkMode, toggleTheme } = useTheme();
  const [docenteData, setDocenteData] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6; // Número de turmas por página
  const router = useRouter();

  // Função para buscar os dados do docente
  const fetchDocenteData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const decoded: any = jwtDecode(token); // Decodificação do JWT
      const id = decoded?.sub; // Extraindo o ID do usuário do token
      if (!id) throw new Error("ID do usuário não encontrado no token");

      const response = await fetch(
        `http://localhost:3000/api/teacher/classes/${id}`
      );
      if (!response.ok)
        throw new Error("Não foi possível carregar os dados do docente");

      const data = await response.json();
      setDocenteData(data); // Atualiza os dados do docente
    } catch (err: any) {
      setError(err.message); // Tratamento de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Filtra as turmas com base na busca
  const filteredClasses = docenteData?.classes.filter((classe) =>
    classe.nomeTurma.toLowerCase().includes(search.toLowerCase())
  );

  // Lógica de paginação
  const totalPages = Math.ceil(
    (filteredClasses?.length || 0) / classesPerPage
  );
  const displayedClasses = filteredClasses?.slice(
    (currentPage - 1) * classesPerPage,
    currentPage * classesPerPage
  );

  // Atualiza a página atual quando a busca muda
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Aplica o tema ao carregar o componente
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Carrega os dados do docente ao montar o componente
  useEffect(() => {
    fetchDocenteData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-row dark:bg-[#141414]">
      <Sidebar />
      <div className="w-full flex flex-col items-center mt-8">
        <div className="w-full flex justify-end mb-8 mr-28">
          <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
        <div className="container mx-auto p-4 border rounded-lg bg-[#FFFFFF] w-[85%] h-[85%] p-8 pr-15 pt-20 pb-20 space-y-2 rounded-3xl dark:bg-black dark:border-black">
          <div className="relative w-full max-w-md mx-auto flex justify-center items-center mb-6">
            <SearchInput
              placeholder="Buscar turma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <p className="text-center text-gray-700 dark:text-white">
              Carregando...
            </p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedClasses?.map((turma) => (
                  <div
                    key={turma.id}
                    className="bg-blue-50 dark:bg-[#141414] p-4 rounded-lg shadow"
                  >
                    <h3 className="font-bold text-lg dark:text-white">
                      {turma.nomeTurma}{" "}
                      <span className="text-gray-500 text-sm dark:text-[#8A8A8A]">
                        Nº{turma.id}
                      </span>
                    </h3>
                    <p className="text-gray-700 dark:text-white">
                      {turma.quantidadeAlunos} alunos ativos
                    </p>
                    <a href={`/teacher/students/${turma.id}`}>
                      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                        Visualizar turma
                      </button>
                    </a>
                  </div>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}