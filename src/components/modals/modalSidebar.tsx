"use client";
import { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
  confirmButtonColor?: string; // Cor do botão de confirmação
  confirmButtonText?: string; // Texto do botão de confirmação
}

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  confirmButtonColor = "bg-red-600", // Valor padrão
  confirmButtonText = "Sair", // Valor padrão
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-[#141414] p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          ✖
        </button>
        {children}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 border border-gray-300 rounded-lg dark:text-[#ffffff]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${confirmButtonColor} text-white rounded-lg`}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
