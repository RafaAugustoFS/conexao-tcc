"use client";
import Sidebar from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/alunos/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/institution/input"; // Ajuste o caminho conforme necessário
import { Checkbox } from "@/components/ui/institution/checkbox"; // Ajuste o caminho conforme necessário

interface Docente {
  id: number;
  nomeDocente: string;
}

interface Disciplina {
  id: number;
  nomeDisciplina: string;
}

export default function Profile({ value, className }: { value: number; className?: string }) {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    phone: "",
    registrationNumber: "",
    password: "",
  });
  const [disciplineIds, setDisciplineIds] = useState<number[]>([]); // IDs das disciplinas selecionadas
  const [idTeachers, setIdTeachers] = useState<number[]>([]); // IDs dos professores selecionados
  const [darkMode, setDarkMode] = useState(false);

  // Buscar disciplinas
  useEffect(() => {
    fetch("http://localhost:3000/api/discipline")
      .then((response) => response.json())
      .then((data: Disciplina[]) => setDisciplinas(data))
      .catch((error) => console.error("Erro ao buscar disciplinas:", error));
  }, []);


  // Função para lidar com a seleção de disciplinas
  const handleDisciplineSelection = (id: number) => {
    setDisciplineIds((prev) =>
      prev.includes(id)
        ? prev.filter((did) => did !== id) // Remove o ID se já estiver selecionado
        : [...prev, id] // Adiciona o ID se não estiver selecionado
    );
  };

  // Função para atualizar o estado do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para enviar os dados do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica dos campos
    if (
      !formData.name ||
      !formData.email ||
      !formData.birthDate ||
      !formData.phone ||
      !formData.registrationNumber ||
      disciplineIds.length === 0
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ Token JWT não encontrado!");
      alert("Usuário não autenticado. Faça login novamente.");
      return;
    }

    const payload = {
      ...formData,
      disciplineIds,
      idTeachers,
    };

    try {
      const response = await fetch("http://localhost:3000/api/teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error("Erro ao criar o perfil.");
      }

      alert("✅ Perfil criado com sucesso!");
      // Limpar campos após o envio
      setFormData({
        name: "",
        email: "",
        birthDate: "",
        phone: "",
        registrationNumber: "",
        password: "",
      });
      setDisciplineIds([]);
    } catch (error) {
      console.error("❌ Erro ao criar perfil:", error);
      alert("Erro ao criar perfil.");
    }
  };

  // Aplicar modo escuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#ffffff]">Renato</h1>
              <p className="text-gray-500">Tue, 07 June 2022</p>
            </div>
            <Button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
          <div className="container mx-auto p-6 space-y-6 max-w-5xl h-1/2 bg-[#ffffff] dark:bg-[#1a1a1a] rounded-3xl">
            <div className="flex items-start gap-6">
              <Image
                src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg"
                alt="Profile picture"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Nome Completo", type: "text", name: "name" },
                { label: "Data de Nascimento", type: "date", name: "birthDate" },
                { label: "Email", type: "email", name: "email" },
                { label: "Telefone", type: "tel", name: "phone" },
                { label: "Nº Matrícula", type: "text", name: "registrationNumber" },
              ].map(({ label, type, name }) => (
                <div key={name} className="space-y-2">
                  <label className="text-sm text-muted-foreground">{label}</label>
                  <Input
                    type={type}
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className="bg-blue-50 dark:bg-gray-800"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-muted-foreground mb-4">Seleção de disciplinas</h3>
                <div className="space-y-3">
                  {disciplinas.map((disciplina) => (
                    <div key={disciplina.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`disciplina-${disciplina.id}`}
                        checked={disciplineIds.includes(disciplina.id)}
                        onCheckedChange={() => handleDisciplineSelection(disciplina.id)}
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
                onClick={handleSubmit}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}