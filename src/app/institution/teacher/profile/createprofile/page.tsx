"use client";
import Sidebar from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/institution/buttonSubmit";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/institution/input";
import { Checkbox } from "@/components/ui/institution/checkbox";
import { useParams } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";


interface Disciplina {
  id: number;
  nomeDisciplina: string;
}

export default function Profile() {
  const params = useParams();
  const id = params.id as string;
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nomeDocente: "",
    emailDocente: "",
    dataNascimentoDocente: "",
    telefoneDocente: "",
  });
  const [disciplineId, setDisciplineId] = useState<number[]>([]);
  const { darkMode, toggleTheme } = useTheme(); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/discipline")
      .then((response) => response.json())
      .then((data: Disciplina[]) => {
        setDisciplinas(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Erro ao buscar disciplinas:", error);
        setError("Erro ao carregar disciplinas. Tente novamente mais tarde.");
      })
      .finally(() => setLoading(false));
  }, []);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^\d{10,11}$/;
    return regex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDisciplineSelection = (id: number) => {
    setDisciplineId((prev) =>
      prev.includes(id) ? prev.filter((did) => did !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Validação dos campos
    if (
      !formData.nomeDocente ||
      !formData.emailDocente ||
      !formData.dataNascimentoDocente ||
      !formData.telefoneDocente ||
      disciplineId.length === 0
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      setIsSubmitting(false);
      return;
    }
  
    if (!validateEmail(formData.emailDocente)) {
      alert("Por favor, insira um email válido.");
      setIsSubmitting(false);
      return;
    }
  
    if (!validatePhone(formData.telefoneDocente)) {
      alert("Por favor, insira um telefone válido.");
      setIsSubmitting(false);
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado. Faça login novamente.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const payload = {
        nomeDocente: formData.nomeDocente,
        emailDocente: formData.emailDocente,
        dataNascimentoDocente: formData.dataNascimentoDocente,
        telefoneDocente: formData.telefoneDocente,
        disciplineId: disciplineId,
      };
  
      console.log("Dados enviados:", payload); // Log para depuração
  
      const response = await fetch("http://localhost:3000/api/teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || "Erro ao criar o perfil.");
      }
  
      alert("✅ Perfil criado com sucesso!");
  
      // Limpar campos após o envio
      setFormData({
        nomeDocente: "",
        emailDocente: "",
        dataNascimentoDocente: "",
        telefoneDocente: ""
        
      });
      setDisciplineId([]);
    } catch (error) {
      console.error("❌ Erro ao criar perfil:", error);
      if (error instanceof Error) {
        alert(`Erro: ${error.message}`);
      } else if (typeof error === "string") {
        alert(`Erro: ${error}`);
      } else {
        alert("Erro ao criar perfil. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
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
              <h1 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#ffffff]">
                Renato
              </h1>
              <p className="text-gray-500">Tue, 07 June 2022</p>
            </div>
            <Button onClick={toggleTheme}>
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
                { label: "Nome Completo", type: "text", name: "nomeDocente" },
                {
                  label: "Data de Nascimento",
                  type: "date",
                  name: "dataNascimentoDocente",
                },
                { label: "Email", type: "email", name: "emailDocente" },
                { label: "Telefone", type: "tel", name: "telefoneDocente" },
              ].map(({ label, type, name }) => (
                <div key={name} className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    {label}
                  </label>
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
                <h3 className="text-sm text-muted-foreground mb-4">
                  Seleção de disciplinas
                </h3>
                {loading ? (
                  <p>Carregando disciplinas...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <div className="space-y-3">
                    {disciplinas.map((disciplina) => (
                      <div
                        key={disciplina.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`disciplina-${disciplina.id}`}
                          checked={disciplineId.includes(disciplina.id)}
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
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                onClick={handleSubmit}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
