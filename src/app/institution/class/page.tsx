"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/alunos/button";
import Sidebar from "@/components/layout/sidebarInstitution";
import SearchInput from "@/components/ui/search";
import FloatingButton from "@/components/ui/institution/FloatingButton";
import Link from "next/link";
import DeleteModal from "@/components/modals/modelDelete";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ClassProfile {
  id: number;
  nomeTurma: string;
  codigo: string;
  alunosAtivos: number;
}

export default function CheckInEmocional({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const { darkMode, toggleTheme } = useTheme();
  const [classes, setClasses] = useState<ClassProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  const fetchClassesData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/class");
      if (!response.ok)
        throw new Error("Não foi possível carregar os dados das turmas");

      const data = await response.json();
      console.log("Dados recebidos:", data);
      setClasses(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const deleteClass = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/class/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir a turma");

      setClasses((prevClasses) =>
        prevClasses.filter((turma) => turma.id !== id)
      );
      setIsModalOpen(false);
      setSelectedClassId(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedClassId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedClassId !== null) {
      deleteClass(selectedClassId);
      toast.success("Turma deletada com sucesso!");
    }
  };

  useEffect(() => {
    fetchClassesData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredClasses = classes.filter((turma) =>
    turma.nomeTurma.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClasses.length / studentsPerPage);
  const displayedClasses = filteredClasses.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  return (
    <>
      <ToastContainer />
      <div
        className={`min-h-screen bg-[#F0F7FF] flex flex-row dark:bg-[#141414]`}
      >
        <Sidebar />
        <div className="w-full flex flex-col items-center mt-8">
          <div className="w-full flex justify-end mb-8 mr-28">
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
          <div className="container mx-auto border bg-[#FFFFFF] w-[85%] h-[85%] p-8 pr-15 pt-20 pb-20 space-y-2 rounded-3xl dark:bg-black dark:border-black">
            <div className="relative w-full max-w-md mx-auto flex justify-center items-center mb-6">
              <SearchInput
                placeholder="Digite o nome ou código da turma"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <p className="text-center text-gray-700 dark:text-white">
                  Carregando turmas...
                </p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : displayedClasses.length === 0 ? (
                <p className="text-center text-gray-700 dark:text-white">
                  Nenhuma turma encontrada.
                </p>
              ) : (
                displayedClasses.map((turma) => (
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
                      {turma.alunosAtivos} alunos ativos
                    </p>
                    <div className="flex flex-row items-center space-x-16">
                      <Link href={`class/viewclass/${turma.id}`}>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                          Visualizar turma
                        </button>
                      </Link>
                      <div className="space-x-4">
                        <Link href={`class/editclass/${turma.id}`}>
                          <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <Pencil size={20} />
                          </button>
                        </Link>

                        <button
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                          onClick={() => handleDeleteClick(turma.id)} // Abre o modal antes de excluir
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
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
          <FloatingButton rote="class/createclass" />
        </div>
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete} // Só exclui quando confirmar
        />
      </div>
    </>
  );
}