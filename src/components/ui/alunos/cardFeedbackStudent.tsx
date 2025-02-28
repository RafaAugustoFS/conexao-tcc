"use client";
import React, { useEffect, useState } from "react";

interface CardFeedbackProps {
  persons?: string[];
}

export default function CardFeedback({ persons = [] }: CardFeedbackProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const studentsPerPage = 6;
  const [darkMode, setDarkMode] = useState(false);

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

  const filteredStudents = persons.filter((person) =>
    person.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const displayedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {displayedStudents.map((person, index) => {
          const id = index + (currentPage - 1) * studentsPerPage;
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
                  <span className="font-medium">{person}</span>
                  <span className="text-green-600">Ativo(a)</span>
                </div>
              </button>

              {selectedId === id && (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite algo..."
                  className="mt-2 w-full p-2 border rounded-lg dark:bg-[#222] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
