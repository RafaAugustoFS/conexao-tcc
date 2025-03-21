"use client";

import Sidebar from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/alunos/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/institution/input";
import { useParams } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ModalCreate from "@/components/modals/modalCreate";
import InputImage from "@/components/ui/institution/InputImage";

interface Turma {
  id: number;
  nomeTurma: string;
}

export default function Profile({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const params = useParams();
  const id = params.id as string;

  const [nomeAluno, setName] = useState("");
  const [emailAluno, setEmail] = useState("");
  const [dataNascimentoAluno, setBirthDate] = useState("");
  const [telefoneAluno, setPhone] = useState("");
  const [turma, setTurma] = useState("");
  const [imageUrl, setImagemPerfil] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { darkMode, toggleTheme } = useTheme();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Evento detectado!"); // Log para testar se a função está sendo chamada

    if (!event.target.files || event.target.files.length === 0) {
      console.log("Nenhum arquivo selecionado.");
      return;
    }

    const file = event.target.files[0];
    console.log("Arquivo selecionado:", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        console.log("Imagem carregada:", reader.result);
        setImagemPerfil(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!nomeAluno || !emailAluno || !dataNascimentoAluno || !telefoneAluno) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
      setIsModalOpen(true);
      const response = await fetch("http://localhost:3000/api/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nomeAluno,
          emailAluno,
          dataNascimentoAluno,
          telefoneAluno,
          turmaId: id,
          imageUrl,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar o perfil.");

      alert("✅ Perfil criado com sucesso!");
      setName("");
      setEmail("");
      setBirthDate("");
      setPhone("");
    } catch (error) {
      console.error("❌ Erro ao criar perfil:", error);
      alert("Erro ao criar perfil.");
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("pt-BR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/class/teacher/disciplinas/${id}`)
      .then((response) => response.json())
      .then((data) => setTurma(data))
      .catch((error) => console.error("Erro ao buscar turma:", error));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#ffffff]">
                {turma.nomeTurma}
              </h1>
              <p className="text-gray-500">{getCurrentDate()}</p>
            </div>
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          <div className="container mx-auto p-6 space-y-6 max-w-5xl bg-white dark:bg-gray-800 rounded-3xl">
            <div className="flex flex-col items-center gap-4">
              <Image
                src={
                  imageUrl ||
                  "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg"
                }
                alt="Profile picture"
                width={100}
                height={100}
                className="rounded-full border border-gray-300 shadow-md"
              />

              <InputImage onChange={handleImageChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Nome Completo", state: nomeAluno, setState: setName },
                {
                  label: "Data de Nascimento",
                  state: dataNascimentoAluno,
                  setState: setBirthDate,
                },
                { label: "Email", state: emailAluno, setState: setEmail },
                { label: "Telefone", state: telefoneAluno, setState: setPhone },
              ].map(({ label, state, setState }) => (
                <div key={label} className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    {label}
                  </label>
                  <Input
                    type={label === "Data de Nascimento" ? "date" : "text"}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-blue-50 dark:bg-gray-800"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                onClick={handleSubmit}
              >
                Criar estudante
              </Button>
            </div>
          </div>
        </div>
        <ModalCreate
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message="Criando aluno..."
        />
      </main>
    </div>
  );
}
