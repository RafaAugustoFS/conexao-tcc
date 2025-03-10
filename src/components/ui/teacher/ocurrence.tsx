"use client";

import { useState } from "react";
import { Pencil, Trash } from "lucide-react";

export default function Ocurrence() {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  return (
   <div>
     <div className="flex justify-between items-center mb-4">
    <h1 className="text-xl font-bold dark:text-white">
      Adicionar Feedback para aluno
    </h1>
  </div>

  <input
    type="text"
    placeholder="Digite seu feedback..."
    value={feedback}
    onChange={(e) => setFeedback(e.target.value)}
    className="w-full p-3 border rounded-md bg-blue-50 dark:bg-[#141414] border-[#F0F7FF] focus:ring focus:ring-blue-200 mb-4 dark:text-white dark:border-[#141414]"
  />


  <div className="flex space-x-4">
    <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Enviar
    </button>
    <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
      Cancelar
    </button>
  </div>
   </div>
  );
}
