"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import SmallSelect from "@/components/ui/smallSelect"

interface StudentData {
  name: string
  dataNascimentoAluno: string
  telefoneAluno: string
  emailAluno: string
  matriculaAluno: string
  turma: {
    nomeTurma: string
    idTurma: number
  }
  notas: {
    idNota: number
    nota: number
    bimestre: number
    status: string
    nomeDisciplina: string
  }[]
}

interface Subject {
  name: string
  grade: number
  color: string
  textColor: string
}

const GradeCard: React.FC = () => {
  const [studentData, setStudentData] = useState<StudentData>({
    name: "",
    dataNascimentoAluno: "",
    telefoneAluno: "",
    emailAluno: "",
    matriculaAluno: "",
    turma: { nomeTurma: "", idTurma: 0 },
    notas: [],
  })
  const [selectedType, setSelectedType] = useState("1º Bimestre")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStudentData()
  }, [])

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token não encontrado")

      const decoded: any = jwtDecode(token)
      const userId = decoded?.sub || "1" // Fallback para "1" se não encontrar o ID no token

      const response = await fetch(`http://localhost:3000/api/student/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Erro ao buscar dados do aluno")

      const data = await response.json()
      setStudentData(data)
    } catch (err: any) {
      setError(err.message || "Erro ao buscar dados do aluno")
    } finally {
      setLoading(false)
    }
  }

  const getGradeForSelectedBimester = (bimester: string) => {
    const bimesterNumber = Number.parseInt(bimester.split("º")[0])

    if (!studentData.notas) return 0

    const notasBimestre = studentData.notas.filter((nota) => nota.bimestre === bimesterNumber)
    if (notasBimestre.length === 0) return 0

    // Calcula a média das notas do bimestre selecionado
    const media = notasBimestre.reduce((acc, curr) => acc + curr.nota, 0) / notasBimestre.length
    return Math.round(media * 10) // Convertendo para percentual (0-100)
  }

  const getSubjectName = (index: number) => {
    if (!studentData.notas || studentData.notas.length <= index) {
      return "Matéria não encontrada"
    }

    return studentData.notas[index]?.nomeDisciplina || "Matéria não encontrada"
  }

  const subjects: Subject[] =
    loading || !studentData.notas
      ? []
      : [
          {
            name: "Backend",
            grade: getGradeForSelectedBimester(selectedType),
            color: "text-purple-500",
            textColor: "text-purple-500",
          },
          // Adicione mais matérias conforme necessário
        ]

  const types = ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"]

  const handleTypeClick = (type: string) => {
    setSelectedType(type)
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro: {error}</div>
  }

  return (
    <div className="w-80">
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Notas</h2>
        <div className="flex flex-row items-center justify-center">
          <SmallSelect
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            placeholder="Selecione o Bimestre"
            items={["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"]}
          />
        </div>
      </div>

      <div className="space-y-6">
        {subjects.map((subject, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-bold">{subject.name}</h3>
            </div>

            <div className="relative w-14 h-14">
              <CircularProgressbar
                value={subject.grade}
                styles={buildStyles({
                  textSize: "32px",
                  pathColor: "#0077FF",
                  trailColor: "#E5E7EB",
                })}
              />
              <span
                className={`absolute inset-0 flex items-center justify-center text-sm font-bold text-[#000] dark:text-[#fff]`}
              >
                {subject.grade}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GradeCard