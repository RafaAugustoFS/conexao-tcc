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
import SearchInput from "@/components/ui/search";
import { useTheme } from "@/components/ThemeProvider";


export default function CreateClass() {
  const [docentes, setDocentes] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [nomeTurma, setNomeTurma] = useState("");
  const [anoLetivoTurma, setAnoLetivoTurma] = useState("");
  const [periodoTurma, setPeriodoTurma] = useState("");
  const [capacidadeTurma, setCapacidadeTurma] = useState("");
  const [salaTurma, setSalaTurma] = useState("");
  const [idTeacher, setIdTeacher] = useState(null);
  const [disciplineIds, setDisciplineIds] = useState([]);
  const [idTeachers, setIdTeachers] = useState([]); // 🔹 Agora é um array
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // 🔹 Função para lidar com a seleção de professores
  const handleTeacherSelection = (id) => {
    setIdTeachers((prev) => {
      return prev.includes(id)
        ? prev.filter((tid) => tid !== id)
        : [...prev, id];
    });
  };

  // 🔹 Função para lidar com a seleção de disciplinas
  const handleDisciplineSelection = (id) => {
    setDisciplineIds((prev) => {
      return prev.includes(id)
        ? prev.filter((did) => did !== id)
        : [...prev, id];
    });
  };

  const criarTurma = async () => {
    const token = localStorage.getItem("token"); // Ou sessionStorage.getItem("token");

  if (!token) {
    console.error("❌ Token JWT não encontrado!");
    alert("Usuário não autenticado. Faça login novamente.");
    return;
  }
    console.log("🔍 Validando campos...");
    console.log("📌 Estado atual antes do envio:");
    console.log("📆 Ano Letivo:", anoLetivoTurma);
    console.log("🏫 Nome Turma:", nomeTurma);
    console.log("⏳ Período:", periodoTurma);
    console.log("👥 Professores Selecionados:", idTeachers);
    console.log("📚 Disciplinas Selecionadas:", disciplineIds);

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

    console.log("📤 Enviando payload:", payload);

    try {
      const response = await fetch("http://localhost:3000/api/class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // 🔹 Adiciona o token JWT no header
        },
        body: JSON.stringify(payload),
      });

      console.log("🔄 Status da resposta:", response.status);
      const responseData = await response.json().catch(() => null);
      console.log("📩 Resposta do backend:", responseData);

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
    <div className="flex flex-row bg-[#F0F7FF] items-center">
      <Sidebar />
      <div className="container mx-auto p-6 space-y-6 max-w-5xl h-1/2 bg-[#ffffff] rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">
                Nome da turma
              </label>
              <Input
                className="bg-blue-50"
                value={nomeTurma}
                onChange={(e) => setNomeTurma(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Período</label>
              <Select 
              value={periodoTurma}
              onChange={(value) => {
                console.log("📆 Ano letivo atualizado:", value);
                setPeriodoTurma(value);
              }}>
                <SelectTrigger className="bg-blue-50">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manhã">Manhã</SelectItem>
                  <SelectItem value="Tarde">Tarde</SelectItem>
                  <SelectItem value="Noite">Noite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">
                Ano letivo
              </label>
              <Select
                value={anoLetivoTurma} // 🔹 Agora ele é controlado externamente
                onChange={(value) => {
                  console.log("📆 Ano letivo atualizado:", value);
                  setAnoLetivoTurma(value);
                }}
              >
                <SelectTrigger className="bg-blue-50">
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-01-01">2025</SelectItem>
                  <SelectItem value="2024-01-01">2024</SelectItem>
                  <SelectItem value="2023-01-01">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Capacidade máxima
                </label>
                <Input
                  type="number"
                  className="bg-blue-50"
                  value={capacidadeTurma}
                  onChange={(e) => setCapacidadeTurma(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  N° da sala
                </label>
                <Input
                  className="bg-blue-50"
                  value={salaTurma}
                  onChange={(e) => setSalaTurma(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm text-muted-foreground mb-4">
              Seleção de docentes
            </h3>
            <div className="space-y-3">
              {docentes.map((docente) => (
                <div key={docente.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`docente-${docente.id}`}
                    checked={idTeachers.includes(docente.id)}
                    onCheckedChange={() => handleTeacherSelection(docente.id)}
                  />
                  <label htmlFor={`docente-${docente.id}`}>
                    {docente.nomeDocente}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-muted-foreground mb-4">
              Seleção de disciplinas
            </h3>
            <div className="space-y-3">
              {disciplinas.map((disciplina) => (
                <div
                  key={disciplina.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`disciplina-${disciplina.id}`}
                    checked={disciplineIds.includes(disciplina.id)}
                    onCheckedChange={() =>
                      handleDisciplineSelection(disciplina.id)
                    }
                  />
                  <label htmlFor={`disciplina-${disciplina.id}`}>
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
  );
}
