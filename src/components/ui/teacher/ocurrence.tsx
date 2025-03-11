"use client";

import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function Ocurrence() {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  const enviarFeedback = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const decoded: any = jwtDecode(token); // Decodificação do JWT
      const userId = decoded?.sub; // Extraindo o id do usuário do token
      if (!userId) throw new Error("ID do usuário não encontrado no token");

      // Convertendo o userId para número inteiro
      const userIdInt = parseInt(userId, 10); // Base 10 para decimal
      if (isNaN(userIdInt)) throw new Error("ID do usuário não é um número válido");

      const response = await fetch("http://localhost:3000/api/feedbackTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createdBy: {
            id: userIdInt, // Enviando o ID do professor como parte de um objeto Teacher
          },
          conteudo: feedback,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar o feedback.");
      }

      alert("Feedback enviado com sucesso!");
      setFeedback(""); // Limpa o campo de feedback após o envio
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      alert("Erro ao enviar feedback.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-blue-500 font-bold dark:text-white">
          Adicionar Feedback escrito para aluno
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
        <button
          onClick={enviarFeedback}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}