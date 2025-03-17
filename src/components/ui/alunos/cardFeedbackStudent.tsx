"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Importe a função jwtDecode

// Defina a interface para o objeto Professor
interface Professor {
  id: number;
  nomeDocente: string;
  dataNascimentoDocente: string;
  emailDocente: string;
  telefoneDocente: string;
}

// Atualize a interface CardFeedbackProps para aceitar um array de Professor
interface CardFeedbackProps {
  persons?: Professor[];
}

export default function CardFeedback({ persons = [] }: CardFeedbackProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const studentsPerPage = 6;
  const [darkMode, setDarkMode] = useState(false);

  // Efeito para carregar o modo escuro do localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  // Efeito para aplicar o modo escuro ao documento
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Efeito para resetar a página ao realizar uma busca
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Filtra os professores com base no campo `nomeDocente`
  const filteredStudents = persons.filter((person) =>
    person.nomeDocente.toLowerCase().includes(search.toLowerCase())
  );

  // Lógica de paginação
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const displayedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  // Função para enviar o feedback
  const handleSendFeedback = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const decoded: any = jwtDecode(token);
      const userId = decoded?.sub;
      if (!userId) throw new Error("ID do usuário não encontrado no token");

      if (!selectedId || !inputValue) {
        alert("Selecione um professor e digite um feedback.");
        return;
      }

      const feedbackData = {
        conteudo: inputValue,
        createdBy: { id: parseInt(userId) },
        recipientTeacher: { id: selectedId },
      };

      const response = await fetch("http://localhost:3000/api/feedbackStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar feedback");
      }

      alert("Feedback enviado com sucesso!");
      setInputValue(""); // Limpa o input após o envio
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar feedback.");
    }
  };

  return (
    <div>
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar professor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg dark:bg-[#222] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Grid de cards */}
      <div className="grid grid-cols-3 gap-6">
        {displayedStudents.map((person, index) => {
          const id = person.id; // Use o ID do professor como chave única
          return (
            <div key={id} className="w-full">
              <button
                onClick={() => setSelectedId(id)}
                className="w-full"
              >
                <div
                  className={`flex flex-col items-center p-4 rounded-lg shadow-md bg-[#F0F7FF] dark:bg-[#141414] dark:text-white cursor-pointer transition-all border-2 ${
                    selectedId === id
                      ? "border-blue-500 dark:border-blue-400"
                      : "border-transparent"
                  }`}
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                    🎓
                  </div>
                  <span className="font-medium">{person.nomeDocente}</span>
                  <span className="text-green-600">Ativo(a)</span>
                </div>
              </button>

              {/* Input exibido quando o card é selecionado */}
              {selectedId === id && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Digite seu feedback..."
                    className="w-full p-2 border rounded-lg dark:bg-[#222] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendFeedback}
                    className="mt-2 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Enviar Feedback
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 mx-1 rounded-md transition ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white dark:text-black"
                  : "bg-[#F0F7FF] text-blue-500 hover:bg-gray-300 dark:bg-[#141414]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}