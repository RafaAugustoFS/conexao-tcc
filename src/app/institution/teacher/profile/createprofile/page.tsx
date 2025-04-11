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
import ModalCreate from "@/components/modals/modalCreate";
import InputImage from "@/components/ui/institution/InputImage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import User from "@/assets/images/adicionar-usuario 1.png";

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
  const [nomeDocente, setName] = useState("");
  const [emailDocente, setEmail] = useState("");
  const [dataNascimentoDocente, setBirthDate] = useState("");
  const [telefoneDocente, setPhone] = useState("");
  const [imageUrl, setImagemPerfil] = useState<string | null>(null);
  const [disciplineId, setDisciplineId] = useState<number[]>([]);
  const { darkMode, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para obter a data atual no formato YYYY-MM-DD (para o input date)
  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Função para formatar a data para exibição
  const formatCurrentDate = (): string => {
    const today = new Date();
    return today.toLocaleDateString("pt-BR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  const handleDisciplineSelection = (id: number) => {
    setDisciplineId((prev) =>
      prev.includes(id) ? prev.filter((did) => did !== id) : [...prev, id]
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagemPerfil(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !nomeDocente ||
      !emailDocente ||
      !dataNascimentoDocente ||
      !telefoneDocente
    ) {
      toast.warn("Preencha todos os campos obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(emailDocente)) {
      toast.warn("Por favor, insira um email válido.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePhone(telefoneDocente)) {
      toast.warn("Por favor, insira um telefone válido.");
      setIsSubmitting(false);
      return;
    }

    // Verifica se a data de nascimento é futura
    if (new Date(dataNascimentoDocente) > new Date()) {
      toast.warn("A data de nascimento não pode ser futura.");
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Usuário não autenticado. Faça login novamente.");
      setIsSubmitting(false);
      return;
    }

    try {
      setIsModalOpen(true);
      const response = await fetch("http://localhost:3000/api/teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nomeDocente,
          emailDocente,
          dataNascimentoDocente,
          telefoneDocente,
          imageUrl,
          disciplineId,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar o perfil.");

      toast.success("Perfil criado com sucesso!");
      setName("");
      setEmail("");
      setBirthDate("");
      setPhone("");
      setImagemPerfil(null);
      setDisciplineId([]);
    } catch (error) {
      console.error("❌ Erro ao criar perfil:", error);
      toast.error("Erro ao criar perfil.");
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
        <Sidebar />
        <main className="flex-1">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-blue-500">
                  Criar Docente
                </h1>
                <p className="text-gray-500">{formatCurrentDate()}</p>
              </div>
              <Button onClick={toggleTheme}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>

            <div className="container mx-auto p-6 space-y-6 max-w-5xl h-1/2 bg-[#ffffff] dark:bg-black rounded-3xl">
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={imageUrl || User}
                  width={80}
                  height={80}
                  className="rounded-full w-16 h-16 sm:w-20 sm:h-20"
                  alt="Foto de perfil"
                />

                <InputImage onChange={handleImageChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Nome Completo",
                    state: nomeDocente,
                    setState: setName,
                    maxLength: 100,
                    type: "text",
                  },
                  {
                    label: "Data de Nascimento",
                    state: dataNascimentoDocente,
                    setState: setBirthDate,
                    type: "date",
                    max: getTodayDate(),
                  },
                  {
                    label: "Email",
                    state: emailDocente,
                    setState: setEmail,
                    maxLength: 100,
                    type: "email",
                  },
                  {
                    label: "Telefone",
                    state: telefoneDocente,
                    setState: setPhone,
                    maxLength: 11,
                    type: "tel",
                  },
                ].map(({ label, state, setState, maxLength, type = "text", max }) => (
                  <div key={label} className="space-y-2">
                    <label className="text-sm text-muted-foreground dark:text-gray-400">
                      {label}
                    </label>
                    <Input
                      type={type}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="bg-blue-50 border-blue-50 dark:bg-[#141414] dark:border-[#141414] dark:text-white"
                      maxLength={maxLength}
                      max={max}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-4 dark:text-gray-400">
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
                          className="flex items-center space-x-2 dark:text-white"
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Criando..." : "Criar professor"}
                </Button>
              </div>
            </div>
          </div>
          <ModalCreate
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            message="Criando docente..."
          />
        </main>
      </div>
    </>
  );
}