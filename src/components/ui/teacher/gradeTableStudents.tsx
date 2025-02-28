"use client";

import React from "react";
const subjects = [
  { name: "Frontend", grades: [98.5, 98.5, 60.2, 98.5] },
  { name: "Backend", grades: [75.6, 98.5, 60.2, 98.5] },
  { name: "Redes", grades: [90.6, 98.5, 60.2, 98.5] },
  { name: "Mobile A", grades: [60.2, 98.5, 60.2, 98.5] },
  { name: "Mobile B", grades: [85.3, 98.5, 60.2, 60.2] },
];

const Table = () => {
  return (
    <div className="flex flex-col overflow-x-auto p-4 w-full justify-center items-center bg-white dark:bg-black rounded-[20px]">
      <table className="w-1/2 border-separate border-spacing-8">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2">Matéria</th>
            <th className="p-2">1° Bim.</th>
            <th className="p-2">2° Bim.</th>
            <th className="p-2">3° Bim.</th>
            <th className="p-2">4° Bim.</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-gray-200">
              <td className="p-2 bg-blue-600 text-white font-semibold text-center">
                {subject.name}
              </td>
              {subject.grades.map((grade, i) => (
                <td
                  key={i}
                  className="p-2 text-center border border-transparent text-black bg-[#EAF4FF] dark:bg-[#141414] dark:text-white"
                >
                  {grade}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Editar
      </button>
    </div>
  );
};

export default Table;
