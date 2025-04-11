"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/institution/buttonSubmit"
import { Checkbox } from "@/components/ui/institution/checkbox"
import { Input } from "@/components/ui/institution/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/institution/select"
import Sidebar from "@/components/layout/sidebarInstitution"
import { useTheme } from "@/components/ThemeProvider"
import { Moon, Sun, X } from "lucide-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { useRouter } from "next/navigation"
import FloatingButton from "@/components/ui/institution/FloatingButton"

export default function CreateClass() {
  const [docentes, setDocentes] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [nomeTurma, setNomeTurma] = useState("")
  const [anoLetivoTurma, setAnoLetivoTurma] = useState("")
  const [periodoTurma, setPeriodoTurma] = useState("")
  const [capacidadeTurma, setCapacidadeTurma] = useState("")
  const [salaTurma, setSalaTurma] = useState("")
  const [disciplineId, setDisciplineIds] = useState([])
  const [idTeacher, setIdTeachers] = useState([])
  const { darkMode, toggleTheme } = useTheme()
  const router = useRouter()

  // Estado para controlar a exibição do modal
  const [showModal, setShowModal] = useState(false)
  // Estado para armazenar o nome da disciplina
  const [nomeDisciplina, setNomeDisciplina] = useState("")

  // Buscar docentes
  useEffect(() => {
    fetch("http://localhost:3000/api/teacher")
      .then((response) => response.json())
      .then((data) => setDocentes(data))
      .catch((error) => console.error("Erro ao buscar docentes:", error))
  }, [])

  // Buscar disciplinas
  useEffect(() => {
    fetchDisciplinas()
  }, [])

  // Função para buscar disciplinas
  const fetchDisciplinas = () => {
    fetch("http://localhost:3000/api/discipline")
      .then((response) => response.json())
      .then((data) => setDisciplinas(data))
      .catch((error) => console.error("Erro ao buscar disciplinas:", error))
  }

  // Aplicar o tema ao carregar a página
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  // Função para lidar com a seleção de professores
  const handleTeacherSelection = (id) => {
    setIdTeachers((prev) => (prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]))
  }

  // Função para lidar com a seleção de disciplinas
  const handleDisciplineSelection = (id) => {
    setDisciplineIds((prev) => (prev.includes(id) ? prev.filter((did) => did !== id) : [...prev, id]))
  }

  // Função para criar uma nova disciplina
  const criarDisciplina = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      console.error("❌ Token JWT não encontrado!")
      toast.warn("Usuário não autenticado. Faça login novamente.")
      return
    }

    if (!nomeDisciplina) {
      toast.warn("Preencha o nome da disciplina.")
      return
    }

    try {
      const response = await fetch("http://localhost:3000/api/discipline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nomeDisciplina }),
      })

      if (!response.ok) {
        throw new Error("Erro ao criar a disciplina.")
      }

      toast.success("Disciplina criada com sucesso!")
      setNomeDisciplina("")
      setShowModal(false)

      // Atualizar a lista de disciplinas
      fetchDisciplinas()
    } catch (error) {
      console.error("❌ Erro ao criar disciplina:", error)
      toast.error("Erro ao criar disciplina.")
    }
  }

  const criarTurma = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      console.error("❌ Token JWT não encontrado!")
      toast.warn("Usuário não autenticado. Faça login novamente.")
      return
    }

    if (!nomeTurma || !anoLetivoTurma || !periodoTurma || !capacidadeTurma || !salaTurma) {
      console.error("❌ O ano letivo está vazio!")
      toast.warn("Preencha todos os campos.")
      return
    }

    const payload = {
      nomeTurma,
      anoLetivoTurma: Number.parseInt(anoLetivoTurma, 10),
      periodoTurma,
      capacidadeMaximaTurma: capacidadeTurma,
      salaTurma,
      idTeacher,
      disciplineId,
    }

    try {
      const response = await fetch("http://localhost:3000/api/class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error("Erro ao criar a turma.")
      }

      toast.success("Turma criada com sucesso!")

      setTimeout(() => {
        router.push("/institution/class")
      }, 2000) // Aguarda 2 segundos antes de mudar a página
    } catch (error) {
      console.error("❌ Erro ao criar turma:", error)
      console.log(payload)

      toast.error("Erro ao criar turma.")
    }
  }

  // Função para abrir o modal quando o FloatingButton for clicado
  const handleFloatingButtonClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <ToastContainer />
      <div className={`flex flex-row ${darkMode ? "bg-[#141414]" : "bg-[#F0F7FF]"} min-h-screen`}>
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? "text-blue-500" : "text-blue-500"}`}>
                  Criar Nova Turma
                </h1>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Preencha os campos abaixo para criar uma nova turma.
                </p>
              </div>
              <Button onClick={toggleTheme}>{darkMode ? <Sun size={20} /> : <Moon size={20} />}</Button>
            </div>

            <div
              className={`container mx-auto p-6 space-y-6 max-w-5xl ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              } rounded-3xl`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${darkMode ? "text-gray-400" : "text-muted-foreground"}`}>
                      Nome da turma
                    </label>
                    <Input
                      className={`${
                        darkMode ? "bg-[#141414] border-[#141414] text-white" : "bg-blue-50 border-blue-50"
                      }`}
                      value={nomeTurma}
                      maxLength={50}
                      onChange={(e) => setNomeTurma(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={`text-sm ${darkMode ? "text-gray-400" : "text-muted-foreground"}`}>Período</label>
                    <Select value={periodoTurma} onChange={(value) => setPeriodoTurma(value)}>
                      <SelectTrigger
                        className={`${
                          darkMode ? "bg-[#141414] border-[#141414] text-white" : "bg-blue-50 border-blue-50"
                        }`}
                      >
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manhã">Manhã</SelectItem>
                        <SelectItem value="Tarde">Tarde</SelectItem>
                        <SelectItem value="Noite">Noite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${darkMode ? "text-gray-400" : "text-muted-foreground"}`}>
                      Ano letivo
                    </label>
                    <Select value={anoLetivoTurma} onChange={(value) => setAnoLetivoTurma(value)}>
                      <SelectTrigger
                        className={`${
                          darkMode ? "bg-[#141414] border-[#141414] text-white" : "bg-blue-50 border-blue-50"
                        }`}
                      >
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                      <SelectContent className={darkMode ? "bg-[#2D2D2D] text-white" : ""}>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`text-sm ${darkMode ? "text-gray-400" : "text-muted-foreground"}`}>
                        Capacidade máxima
                      </label>
                      <Input
                        type="number"
                        className={`${
                          darkMode ? "bg-[#141414] border-[#141414] text-white" : "bg-blue-50 border-blue-50"
                        }`}
                        value={capacidadeTurma}
                        onChange={(e) => setCapacidadeTurma(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={`text-sm ${darkMode ? "text-gray-400" : "text-muted-foreground"}`}>
                        N° da sala
                      </label>
                      <Input
                        className={`${
                          darkMode ? "bg-[#141414] border-[#141414] text-white" : "bg-blue-50 border-blue-50"
                        }`}
                        value={salaTurma}
                        onChange={(e) => setSalaTurma(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-sm ${darkMode ? "text-gray-400" : "text-muted-foreground"} mb-4`}>
                    Seleção de docentes
                  </h3>
                  <div className="space-y-3">
                    {docentes.map((docente) => (
                      <div key={docente.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`docente-${docente.id}`}
                          checked={idTeacher.includes(docente.id)}
                          onCheckedChange={() => handleTeacherSelection(docente.id)}
                          className={darkMode ? "text-white" : ""}
                        />
                        <label htmlFor={`docente-${docente.id}`} className={darkMode ? "text-white" : ""}>
                          {docente.nomeDocente}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-sm ${darkMode ? "text-gray-400" : "text-muted-foreground"} mb-4`}>
                    Seleção de disciplinas
                  </h3>
                  <div className="space-y-3">
                    {disciplinas.map((disciplina) => (
                      <div key={disciplina.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`disciplina-${disciplina.id}`}
                          checked={disciplineId.includes(disciplina.id)}
                          onCheckedChange={() => handleDisciplineSelection(disciplina.id)}
                          className={darkMode ? "text-white" : ""}
                        />
                        <label htmlFor={`disciplina-${disciplina.id}`} className={darkMode ? "text-white" : ""}>
                          {disciplina.nomeDisciplina}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8" onClick={criarTurma}>
                  Criar Turma
                </Button>
              </div>
            </div>
          </div>
        </main>
        <FloatingButton rote="class/createclass" onClick={handleFloatingButtonClick} />

        {/* Modal para criar disciplina */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className={`${darkMode ? "bg-[#141414] text-white" : "bg-white text-black"} p-6 rounded-lg shadow-lg w-full max-w-md`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-500">Nova Disciplina</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              <div className="mb-4">
                <label className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
                  Nome da Disciplina
                </label>
                <Input
                  className={`w-full ${darkMode ? "bg-[#2D2D2D] border-[#2D2D2D] text-white" : "bg-blue-50 border-blue-50"}`}
                  value={nomeDisciplina}
                  onChange={(e) => setNomeDisciplina(e.target.value)}
                  placeholder="Digite o nome da disciplina"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => setShowModal(false)}
                  className={`${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} text-${darkMode ? "white" : "gray-800"}`}
                >
                  Cancelar
                </Button>
                <Button onClick={criarDisciplina} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Criar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
