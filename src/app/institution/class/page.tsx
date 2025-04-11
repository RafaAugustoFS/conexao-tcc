"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Pencil, Trash, Menu } from "lucide-react"
import { Button } from "@/components/ui/alunos/button"
import Sidebar from "@/components/layout/sidebarInstitution"
import SearchInput from "@/components/ui/search"
import FloatingButton from "@/components/ui/institution/FloatingButton"
import Link from "next/link"
import DeleteModal from "@/components/modals/modelDelete"
import { useTheme } from "@/components/ThemeProvider"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

interface ClassProfile {
  id: number
  nomeTurma: string
  codigo: string
  alunosAtivos: number
}

export default function CheckInEmocional({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const { darkMode, toggleTheme } = useTheme()
  const [classes, setClasses] = useState<ClassProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const studentsPerPage = 6
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const fetchClassesData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/class")
      if (!response.ok) throw new Error("Não foi possível carregar os dados das turmas")

      const data = await response.json()
      console.log("Dados recebidos:", data)
      setClasses(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteClass = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/class/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Erro ao excluir a turma")

      setClasses((prevClasses) => prevClasses.filter((turma) => turma.id !== id))
      setIsModalOpen(false)
      setSelectedClassId(null)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleDeleteClick = (id: number) => {
    setSelectedClassId(id)
    setIsModalOpen(true)
  }

  const confirmDelete = () => {
    if (selectedClassId !== null) {
      deleteClass(selectedClassId)
      toast.success("Turma deletada com sucesso!")
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    fetchClassesData()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const filteredClasses = classes.filter((turma) => turma.nomeTurma.toLowerCase().includes(search.toLowerCase()))

  const totalPages = Math.ceil(filteredClasses.length / studentsPerPage)
  const displayedClasses = filteredClasses.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage)

  return (
    <>
      <ToastContainer />
      <div className={`min-h-screen bg-[#F0F7FF] flex flex-row dark:bg-[#141414]`}>
        {/* Sidebar para desktop */}
        <Sidebar />

        {/* Conteúdo principal */}
        <div className="w-full flex flex-col items-center">
          {/* Barra superior com botões de menu e tema */}
          <div className="w-full flex justify-between items-center px-4 md:px-8 py-4 md:py-6">
            <button className="md:hidden text-gray-700 dark:text-white" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <div className="flex-grow md:flex-grow-0"></div>
            <Button onClick={toggleTheme} className="ml-auto">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          {/* Sidebar móvel */}
          {isSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleSidebar}>
              <div className="h-full w-64 bg-white dark:bg-[#141414] shadow-lg" onClick={(e) => e.stopPropagation()}>
                <Sidebar />
              </div>
            </div>
          )}

          {/* Container principal */}
          <div className="container mx-auto border bg-[#FFFFFF] w-[95%] md:w-[90%] lg:w-[85%] p-4 md:p-6 lg:p-8 space-y-2 rounded-3xl dark:bg-black dark:border-black">
            {/* Barra de pesquisa */}
            <div className="relative w-full max-w-md mx-auto flex justify-center items-center mb-6">
              <SearchInput
                placeholder="Digite o nome ou código da turma"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Grid de turmas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <p className="text-center text-gray-700 dark:text-white col-span-full">Carregando turmas...</p>
              ) : error ? (
                <p className="text-center text-red-500 col-span-full">{error}</p>
              ) : displayedClasses.length === 0 ? (
                <p className="text-center text-gray-700 dark:text-white col-span-full">Nenhuma turma encontrada.</p>
              ) : (
                displayedClasses.map((turma) => (
                  <div key={turma.id} className="bg-blue-50 dark:bg-[#141414] p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg dark:text-white max-w-full break-words">
                      {turma.nomeTurma} <span className="text-gray-500 text-sm dark:text-[#8A8A8A]">Nº{turma.id}</span>
                    </h3>
                    <p className="text-gray-700 dark:text-white">{turma.alunosAtivos} alunos ativos</p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-3">
                      <Link href={`class/viewclass/${turma.id}`} className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded">
                          Visualizar turma
                        </button>
                      </Link>
                      <div className="flex space-x-4 mt-2 sm:mt-0">
                        <Link href={`class/editclass/${turma.id}`}>
                          <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <Pencil size={20} />
                          </button>
                        </Link>

                        <button
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                          onClick={() => handleDeleteClick(turma.id)}
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 md:px-4 md:py-2 mx-1 my-1 rounded-md transition ${
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
        <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} />
      </div>
    </>
  )
}
