"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, User, FileText, Calendar, AlertTriangle, Brain, LogOut, Menu, X } from "lucide-react"
import { Epilogue } from "next/font/google"
import Image from "next/image"
import logo from "../../assets/images/logo.png"
import Modal from "@/components/modals/modalSidebar"

const epilogue = Epilogue({ subsets: ["latin"], weight: ["400", "700"] })

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Check if we're on mobile and auto-close sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      const shouldCollapse = window.innerWidth < 1536
      setIsCollapsed(shouldCollapse)
      if (shouldCollapse) setIsOpen(false)
      else setIsOpen(true)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleLogout = () => {
    setIsModalOpen(false)
    console.log("Usuário deslogado") // Aqui você pode redirecionar para a página de login
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Toggle button for mobile - always visible */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 2xl:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X className="w-6 h-6 text-blue-500" /> : <Menu className="w-6 h-6 text-blue-500" />}
      </button>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && isCollapsed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed 2xl:static z-40 w-64 h-screen bg-white dark:bg-black flex flex-col justify-between rounded-r-[20px] transition-transform duration-300 ease-in-out ${epilogue.className}`}
      >
        <div>
          <Link href="/student" className="flex items-center space-x-4 pb-6 justify-center mt-8">
            <Image src={logo || "/placeholder.svg"} alt="Logo ONA" width={38} height={38} />
            <span className="text-[#6A95F4] text-xl font-bold">ONA</span>
          </Link>
          <nav className="w-64 mt-24">
            <ul>
              <li className="group pt-4 pb-4 flex flex-row justify-center hover:bg-[#F0F7FF] hover:text-blue-500 dark:hover:bg-[#141414] hover:border-l-4 border-blue-500 ">
                <Link
                  href="/student"
                  className="flex items-center space-x-2 text-gray-500 w-32 text-center text-base font-semibold "
                  onClick={() => isCollapsed && setIsOpen(false)}
                >
                  <Home className="w-8 h-8 stroke-2 group-hover:text-blue-500" />
                  <span className="group-hover:text-blue-500">Home</span>
                </Link>
              </li>
              <li className="group pt-4 pb-4 flex flex-row justify-center hover:bg-[#F0F7FF] hover:text-blue-500 dark:hover:bg-[#141414] hover:border-l-4 border-blue-500">
                <Link
                  href="/student/profile"
                  className="flex items-center space-x-2 text-gray-500 w-32 text-center text-base font-semibold"
                  onClick={() => isCollapsed && setIsOpen(false)}
                >
                  <User className="w-8 h-8 stroke-2 group-hover:text-blue-500" />
                  <span className="group-hover:text-blue-500">Perfil</span>
                </Link>
              </li>
              <li className="group pt-4 pb-4 flex flex-row justify-center hover:bg-[#F0F7FF] hover:text-blue-500 dark:hover:bg-[#141414] hover:border-l-4 border-blue-500">
                <Link
                  href="/student/notes"
                  className="flex items-center space-x-2 text-gray-500 w-32 text-center text-base font-semibold"
                  onClick={() => isCollapsed && setIsOpen(false)}
                >
                  <FileText className="w-8 h-8 stroke-2 group-hover:text-blue-500" />
                  <span className="group-hover:text-blue-500">Boletim</span>
                </Link>
              </li>
              <li className="group pt-4 pb-4 flex flex-row justify-center hover:bg-[#F0F7FF] hover:text-blue-500 dark:hover:bg-[#141414] hover:border-l-4 border-blue-500">
                <Link
                  href="/student/event"
                  className="flex items-center space-x-2 text-gray-500 w-32 text-center text-base font-semibold"
                  onClick={() => isCollapsed && setIsOpen(false)}
                >
                  <Calendar className="w-8 h-8 stroke-2 group-hover:text-blue-500" />
                  <span className="group-hover:text-blue-500">Eventos</span>
                </Link>
              </li>
              <li className="group pt-4 pb-4 flex flex-row justify-center hover:bg-[#F0F7FF] hover:text-blue-500 dark:hover:bg-[#141414] hover:border-l-4 border-blue-500">
                <Link
                  href="/student/feedback"
                  className="flex items-center space-x-2 text-gray-500 w-32 text-center text-base font-semibold"
                  onClick={() => isCollapsed && setIsOpen(false)}
                >
                  <AlertTriangle className="w-8 h-8 stroke-2 group-hover:text-blue-500" />
                  <span className="group-hover:text-blue-500">Feedback</span>
                </Link>
              </li>
              <li className="group pt-4 pb-4 flex flex-row justify-center hover:bg-[#F0F7FF] hover:text-blue-500 dark:hover:bg-[#141414] hover:border-l-4 border-blue-500">
                <Link
                  href="/student/form"
                  className="flex items-center space-x-2 text-gray-500 w-32 text-center text-base font-semibold"
                  onClick={() => isCollapsed && setIsOpen(false)}
                >
                  <Brain className="w-8 h-8 stroke-2 group-hover:text-blue-500" />
                  <span className="group-hover:text-blue-500">Emocional</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 justify-center text-red-500 text-center text-base font-semibold pb-8 w-full"
          >
            <LogOut className="w-8 h-8 stroke-2" />
            <span>Sair</span>
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleLogout}>
          <h2 className="text-lg font-bold mb-4">Confirmar saída</h2>
          <p>Tem certeza que deseja sair?</p>
        </Modal>
      </div>
    </>
  )
}

export default Sidebar

