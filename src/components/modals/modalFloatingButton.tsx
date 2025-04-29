"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/alunos/button";
import { Calendar } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedTime, setSelectedTime] = useState("");
  if (!isOpen) return null;

 
  const timeSlots = [
    "09:00 às 11:00",
    "11:00 às 13:00",
    "13:00 às 15:00",
    "15:00 às 17:00",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-[500px] relative">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Nome do evento</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Nome do evento"
        />
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Descrição do evento"
        ></textarea>
        <h3 className="text-md font-bold mb-2">Horários</h3>
        <div className="flex gap-2 mb-4">
          {timeSlots.map((time) => (
            <button
              key={time}
              className={`px-2 py-1 border rounded ${
    selectedTime === time ? "bg-blue-500 text-white" : "bg-white"
  }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
        <h3 className="text-md font-bold mb-2">Local</h3>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Local"
        />
        <h3 className="text-md font-bold mb-2">Selecione a data</h3>
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded pr-10"
            placeholder="dd/mm/aaaa"
          />
          <Calendar className="absolute top-2 right-2 text-blue-500" size={20} />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Adicionar evento
        </button>
      </div>
    </div>
  );
};

export default Modal;