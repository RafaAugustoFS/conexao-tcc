"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Select from "react-select";
import { OccurrencesTable } from "@/components/ui/alunos/occurrences-table";
import Sidebar from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/alunos/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";


const dataByBimester = {
  "1º Bimestre": [
    { name: "Engajamento", value: 80 },
    { name: "Disposição", value: 60 },
    { name: "Entrega", value: 90 },
    { name: "Atenção", value: 70 },
    { name: "Comportamento", value: 40 },
  ],
  "2º Bimestre": [
    { name: "Engajamento", value: 85 },
    { name: "Disposição", value: 65 },
    { name: "Entrega", value: 95 },
    { name: "Atenção", value: 75 },
    { name: "Comportamento", value: 50 },
  ],
  "3º Bimestre": [
    { name: "Engajamento", value: 70 },
    { name: "Disposição", value: 55 },
    { name: "Entrega", value: 80 },
    { name: "Atenção", value: 65 },
    { name: "Comportamento", value: 45 },
  ],
  "4º Bimestre": [
    { name: "Engajamento", value: 90 },
    { name: "Disposição", value: 75 },
    { name: "Entrega", value: 85 },
    { name: "Atenção", value: 80 },
    { name: "Comportamento", value: 60 },
  ],
};

type Bimester = "1º Bimestre" | "2º Bimestre" | "3º Bimestre" | "4º Bimestre";

export default function Home() {
  const { darkMode, toggleTheme } = useTheme(); 

  const [selectedBimester, setSelectedBimester] = useState<Bimester>("1º Bimestre");

  const options = Object.keys(dataByBimester).map((bimester) => ({
    value: bimester,
    label: bimester,
  }));

  const chartData = dataByBimester[selectedBimester] || [];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#141414] flex flex-row">
      <Sidebar />
      <div className="container mx-auto p-4">
        <div className="w-full flex flex-row justify-end">
        <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
        <div className="space-y-6 bg-[#FFFFFF] dark:bg-black dark:text-[#ffffffd8] p-8 rounded-2xl max-h-[800px] overflow-y-auto pr scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <OccurrencesTable />
          <div className="w-full flex justify-center items-center">
          <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-md w-[800px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold dark:text-white">Desempenho</h2>
              <Select
                options={options}
                defaultValue={options[0]}
                onChange={(option) => setSelectedBimester(option?.value as Bimester)}
                className="w-48"
              />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#007bff" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
