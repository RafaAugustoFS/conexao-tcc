"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "../../components/ui/alunos/calendar";
import { EventList } from "../../components/ui/alunos/event-list";
import Image from "next/image";
import Modal from "@/components/modals/modalSidebar";

import Notification from "../../assets/images/Notification.png";

export default function LateralCalendar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para lidar com notificações
  const handleNotify = () => {
    console.log("Notificações ativadas!");
    alert("Notificações ativadas com sucesso!");
    setIsModalOpen(false); // Fecha o modal após confirmação
  };

  // Verifica o tamanho da tela para ajustar o estado colapsado
  useEffect(() => {
    const checkScreenSize = () => {
      const shouldCollapse = window.innerWidth < 1536;
      setIsCollapsed(shouldCollapse);
      setIsOpen(!shouldCollapse);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão para abrir/fechar o calendário */}
      <button
        onClick={toggleCalendar}
        className="fixed top-4 right-4 z-50 2xl:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
        aria-label={isOpen ? "Fechar calendário" : "Abrir calendário"}
      >
        {isOpen ? (
          <ChevronRight className="w-6 h-6 text-blue-500" />
        ) : (
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        )}
      </button>

      {/* Overlay quando o calendário está aberto no modo colapsado */}
      {isOpen && isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 2xl:hidden"
          onClick={toggleCalendar}
        />
      )}

      {/* Painel do calendário */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed 2xl:static right-0 z-40 w-80 max-2xl:h-screen bg-white dark:bg-black rounded-l-[20px] transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="max-w-md mx-auto p-4">
          {/* Botão de Notificação */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8">
                <Image
                  src={Notification}
                  alt="Notification bell"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
          </div>
          <Calendar />
          <EventList />
        </div>
      </div>

      {/* Modal de Confirmação */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleNotify}
        confirmButtonColor="bg-blue-600" // Cor personalizada
        confirmButtonText="Ativar"
      >
        <h2 className="text-lg font-bold mb-4">
          Confirmar ativação de notificações
        </h2>
        <p>Tem certeza que deseja ativar?</p>
      </Modal>
    </>
  );
}
