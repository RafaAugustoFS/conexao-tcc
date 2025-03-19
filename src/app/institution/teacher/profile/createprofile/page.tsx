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
  const [nomeDocente, setName] = useState("");
  const [emailDocente, setEmail] = useState("");
  const [dataNascimentoDocente, setBirthDate] = useState("");
  const [telefoneDocente, setPhone] = useState("");
  const [imageUrl, setImagemPerfil] = useState<string | null>(null);
  const [disciplineId, setDisciplineId] = useState<number[]>([]);
  const { darkMode, toggleTheme } = useTheme(); 
  const [isSubmitting, setIsSubmitting] = useState(false);  useEffect(() => {
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

    if (!nomeDocente || !emailDocente || !dataNascimentoDocente || !telefoneDocente) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!validateEmail(emailDocente)) {
      alert("Por favor, insira um email válido.");
      setIsSubmitting(false);
    }

    if (!validatePhone(telefoneDocente)) {
      alert("Por favor, insira um telefone válido.");
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
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
          disciplineId
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

            <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Foto de Perfil</label>
            <input type="file" accept="image/*" onChange={handleImageChange}/>

          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Nome Completo", state: nomeDocente, setState: setName },
                {
                  label: "Data de Nascimento",
                  state: dataNascimentoDocente,
                  setState: setBirthDate,
                },
                { label: "Email", state: emailDocente, setState: setEmail },
                { label: "Telefone", state: telefoneDocente, setState: setPhone },
              ].map(({ label, state, setState }) => (
                <div key={label} className="space-y-2">
                  <label className="text-sm text-muted-foreground">{label}</label>
                  <Input
                    type={label === "Data de Nascimento" ? "date" : "text"}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
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
