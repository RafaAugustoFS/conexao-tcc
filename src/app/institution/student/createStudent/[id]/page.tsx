"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/institution/button";
import { Checkbox } from "@/components/ui/institution/checkbox";
import { Input } from "@/components/ui/institution/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/institution/select";
import Sidebar from "@/components/layout/sidebarInstitution";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function CreateClass() {
  const [docentes, setDocentes] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [nomeTurma, setNomeTurma] = useState("");
  const [anoLetivoTurma, setAnoLetivoTurma] = useState("");
  const [periodoTurma, setPeriodoTurma] = useState("");
  const [capacidadeTurma, setCapacidadeTurma] = useState("");
  const [salaTurma, setSalaTurma] = useState("");
  const [disciplineIds, setDisciplineIds] = useState([]);
  const [idTeachers, setIdTeachers] = useState([]);
  const { darkMode, toggleTheme } = useTheme();

  // Buscar docentes
  useEffect(() => {
    fetch("http://localhost:3000/api/teacher")
      .then((response) => response.json())
      .then((data) => setDocentes(data))
      .catch((error) => console.error("Erro ao buscar docentes:", error));
  }, []);

  // Buscar disciplinas
  useEffect(() => {
    fetch("http://localhost:3000/api/discipline")
      .then((response) => response.json())
      .then((data) => setDisciplinas(data))
      .catch((error) => console.error("Erro ao buscar disciplinas:", error));
  }, []);

  // Aplicar o tema ao carregar a página
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Função para lidar com a seleção de professores
  const handleTeacherSelection = (id) => {
    setIdTeachers((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  // Função para lidar com a seleção de disciplinas
  const handleDisciplineSelection = (id) => {
    setDisciplineIds((prev) =>
      prev.includes(id) ? prev.filter((did) => did !== id) : [...prev, id]
    );
  };

  const criarTurma = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ Token JWT não encontrado!");
      alert("Usuário não autenticado. Faça login novamente.");
      return;
    }

    if (!anoLetivoTurma) {
      console.error("❌ O ano letivo está vazio!");
      alert("Selecione um ano letivo.");
      return;
    }

    const payload = {
      nomeTurma,
      anoLetivoTurma,
      periodoTurma,
      capacidadeMaximaTurma: capacidadeTurma,
      salaTurma,
      idTeachers,
      disciplineIds,
    };

    try {
      const response = await fetch("http://localhost:3000/api/class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar a turma.");
      }

      alert("✅ Turma criada com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao criar turma:", error);
      alert("Erro ao criar turma.");
    }
  };

  return (
    <div className={`flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]`}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#ffffff]">
                Criar Nova Turma
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Preencha os campos abaixo para criar uma nova turma.
              </p>
            </div>
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          <div className={`container mx-auto p-6 space-y-6 max-w-5xl bg-white dark:bg-black rounded-3xl`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground dark:text-gray-400">
                    Nome da turma
                  </label>
                  <Input
                    className="bg-blue-50 dark:bg-[#2D2D2D] dark:border-[#444444] dark:text-white"
                    value={nomeTurma}
                    onChange={(e) => setNomeTurma(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground dark:text-gray-400">
                    Período
                  </label>
                  <Select
                    value={periodoTurma}
                    onChange={(value) => setPeriodoTurma(value)}
                  >
                    <SelectTrigger className="bg-blue-50 dark:bg-[#2D2D2D] dark:border-[#444444] dark:text-white">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#2D2D2D] dark:text-white">
                      <SelectItem value="Manhã">Manhã</SelectItem>
                      <SelectItem value="Tarde">Tarde</SelectItem>
                      <SelectItem value="Noite">Noite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground dark:text-gray-400">
                    Ano letivo
                  </label>
                  <Select
                    value={anoLetivoTurma}
                    onChange={(value) => setAnoLetivoTurma(value)}
                  >
                    <SelectTrigger className="bg-blue-50 dark:bg-[#2D2D2D] dark:border-[#444444] dark:text-white">
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#2D2D2D] dark:text-white">
                      <SelectItem value="2025-01-01">2025</SelectItem>
                      <SelectItem value="2024-01-01">2024</SelectItem>
                      <SelectItem value="2023-01-01">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground dark:text-gray-400">
                      Capacidade máxima
                    </label>
                    <Input
                      type="number"
                      className="bg-blue-50 dark:bg-[#2D2D2D] dark:border-[#444444] dark:text-white"
                      value={capacidadeTurma}
                      onChange={(e) => setCapacidadeTurma(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground dark:text-gray-400">
                      N° da sala
                    </label>
                    <Input
                      className="bg-blue-50 dark:bg-[#2D2D2D] dark:border-[#444444] dark:text-white"
                      value={salaTurma}
                      onChange={(e) => setSalaTurma(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                  Seleção de docentes
                </h3>
                <div className="space-y-3">
                  {docentes.map((docente) => (
                    <div key={docente.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`docente-${docente.id}`}
                        checked={idTeachers.includes(docente.id)}
                        onCheckedChange={() => handleTeacherSelection(docente.id)}
                        className="dark:text-white"
                      />
                      <label htmlFor={`docente-${docente.id}`} className="dark:text-white">
                        {docente.nomeDocente}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                  Seleção de disciplinas
                </h3>
                <div className="space-y-3">
                  {disciplinas.map((disciplina) => (
                    <div key={disciplina.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`disciplina-${disciplina.id}`}
                        checked={disciplineIds.includes(disciplina.id)}
                        onCheckedChange={() => handleDisciplineSelection(disciplina.id)}
                        className="dark:text-white"
                      />
                      <label htmlFor={`disciplina-${disciplina.id}`} className="dark:text-white">
                        {disciplina.nomeDisciplina}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                onClick={criarTurma}
              >
                Salvar edição
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}