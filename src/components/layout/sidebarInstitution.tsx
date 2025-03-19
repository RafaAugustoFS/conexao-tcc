"use client";
import { useState } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import Link from "next/link";
import {
  Home,
  User,
  FileText,
  Calendar,
  AlertTriangle,
  Brain,
  LogOut,
} from "lucide-react";
import { Epilogue } from "next/font/google";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
import Modal from "@/components/modals/modalSidebar"; // Importando o modal
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const epilogue = Epilogue({ subsets: ["latin"], weight: ["400", "700"] });

const SidebarTeacher = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    setIsModalOpen(false);
    router.push("/");
  };
  return (
    <>
      <div
        className={`w-64 h-screen bg-white dark:bg-black flex flex-col justify-between rounded-r-[20px] ${epilogue.className}`}
      >
        <div>
          <div className="flex items-center space-x-4 pb-6 justify-center mt-8">
            <Image
              src={logo}
              alt="Descrição da imagem"
              width={38}
              height={38}
            />
            <span className="text-[#6A95F4] text-xl font-bold">ONA</span>
          </div>
          <nav className="w-64 mt-24">
            <ul>
              <li className="group pt-4 pb-4 flex flex-row justify-center hover:bg-[#F0F7FF] hover:text-blue-500 dark:hover:bg-[#141414] hover:border-l-4 border-blue-500 ">
                <Link
                  href="/institution"
                  className="flex items-center space-x-2 text-gray-500 w-32 text-center text-base font-semibold "
                >
                  <Home className="w-8 h-8 stroke-2 group-hover:text-blue-500" />
                  <span className="group-hover:text-blue-500">Home</span>
                </Link>
              </li>
              <li className="group pt-4 pb-4 flex flex-row justify-center hover:bg-[#F0F7FF] hover:text-blue-500 dark:hover:bg-[#141414] hover:border-l-4 border-blue-500">
                <Link
                  href="/institution/class"
                  className="flex items-center space-x-2 text-gray-500 w-32 text-center text-base font-semibold"
                >
                  <User className="w-8 h-8 stroke-2 group-hover:text-blue-500" />
                  <span className="group-hover:text-blue-500">Turmas</span>
                </Link>
              </li>
              <li className="group pt-4 pb-4 flex flex-row justify-center hover:bg-[#F0F7FF] hover:text-blue-500 dark:hover:bg-[#141414] hover:border-l-4 border-blue-500">
                <Link
                  href="/institution/event"
                  className="flex items-center space-x-2 text-gray-500 w-32 text-center text-base font-semibold"
                >
                  <FileText className="w-8 h-8 stroke-2 group-hover:text-blue-500" />
                  <span className="group-hover:text-blue-500">Eventos</span>
                </Link>
              </li>
              <li className="group pt-4 pb-4 flex flex-row justify-center hover:bg-[#F0F7FF] hover:text-blue-500 dark:hover:bg-[#141414] hover:border-l-4 border-blue-500">
                <Link
                  href="/institution/teacher"
                  className="flex items-center space-x-2 text-gray-500 w-32 text-center text-base font-semibold"
                >
                  <FaRegAddressCard className="w-8 h-8 stroke-2 group-hover:text-blue-500" />
                  <span className="group-hover:text-blue-500">Docentes</span>
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
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        confirmButtonColor="bg-red-600" // Cor personalizada
        confirmButtonText="Sair"
      >
        <h2 className="text-lg font-bold mb-4">Confirmar saída</h2>
        <p>Tem certeza que deseja sair?</p>
      </Modal>
    </>
  );
};

export default SidebarTeacher;
