"use client"
import Sidebar from "@/components/layout/sidebar"
import BiggerCalendar from "@/components/ui/alunos/biggerCalendar"
import { Button } from "@/components/ui/alunos/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { EventSidebar } from "@/components/ui/alunos/event-sidebar"
import { jwtDecode } from "jwt-decode"

export default function Event() {
  const [darkMode, setDarkMode] = useState(false)
  const [nome, setNome] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    // Format current date
    const formatCurrentDate = () => {
      const date = new Date()
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
      return date.toLocaleDateString("pt-BR", options)
    }

    setCurrentDate(formatCurrentDate())

    const fetchStudentName = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("Token não encontrado")

        const decoded: any = jwtDecode(token)
        const userId = decoded?.sub
        if (!userId) throw new Error("ID do usuário não encontrado no token")

        const response = await fetch(`http://localhost:3000/api/student/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Falha ao buscar dados do estudante")
        }

        const studentData = await response.json()
        // Extract only the name from the response
        setNome(studentData.nome)
      } catch (error) {
        console.error("Erro ao buscar nome do estudante:", error)
      }
    }

    fetchStudentName()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414] ">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8 max-2xl:p-12">
          <div className="flex items-center justify-between mb-8 max-2xl:mb-2">
            <div>
              <h1 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#ffffff]">Bem-Vindo(a), {nome}</h1>
              <p className="text-gray-500">{currentDate}</p>
            </div>
            <Button onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun size={20} /> : <Moon size={20} />}</Button>
          </div>
        </div>

        <div className="flex flex-row justify-center mx-auto bg-white max-w-[1000px] rounded-[20px] p-1 dark:bg-black max-md:flex-col max-md:items-center">
          <BiggerCalendar />
        </div>
      </main>
      <EventSidebar />
    </div>
  )
}

