"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CardFeedbackProps {
  persons?: string | string[]; // Aceita string ou array de strings
  rote?: string;
}

export default function CardFeedback({
  persons = [],
  rote = "/",
}: CardFeedbackProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
  const [darkMode, setDarkMode] = useState(false);

  // Inicializa o modo escuro no cliente
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Converte `persons` para um array, caso seja uma string
  const personsArray = Array.isArray(persons) ? persons : [persons];

  // Filtra os estudantes com base na pesquisa
  const filteredStudents = personsArray.filter((person) =>
    person.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const displayedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  return (
    <div>
      {/* Lista de estudantes */}
      <div className="grid grid-cols-3 gap-6">
        {displayedStudents.map((person, index) => (
          <button key={index}>
            <div className="flex flex-col items-center p-4 rounded-lg shadow-md bg-[#F0F7FF] dark:bg-[#141414] dark:text-white border-[#F0F7FF] dark:border-[#141414] cursor-pointer">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                🎓
              </div>
              <span className="font-medium">{person}</span>
              <Link href={rote}>
                <div className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                  Ver
                </div>
              </Link>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
