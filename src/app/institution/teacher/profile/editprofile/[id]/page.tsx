"use client";
import Sidebar from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/institution/buttonSubmit";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/institution/input";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/institution/checkbox";
import { useTheme } from "@/components/ThemeProvider";

interface Disciplina {
  id: number;
  nomeDisciplina: string;
}

export default function Profile({ value, className }: { value: number; className?: string }) {
  const params = useParams(); // Obtém os parâmetros da URL
  const id = params.id as string; // Extrai o ID da turma da URL
  const { darkMode, toggleTheme } = useTheme(); 
  const [nomeDocente, setNomeDocente] = useState("");
  const [emailDocente, setEmailDocente] = useState("");
  const [dataNascimentoDocente, setDataNascimentoDocente] = useState("");
  const [telefoneDocente, setTelefoneDocente] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disciplineId, setDisciplineId] = useState<number[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  // Busca as disciplinas disponíveis
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

  // Busca os dados do docente e suas disciplinas associadas
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`http://localhost:3000/api/teacher/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNomeDocente(data.nomeDocente || "");
        setEmailDocente(data.emailDocente || "");
        setDataNascimentoDocente(data.dataNascimentoDocente || "");
        setTelefoneDocente(data.telefoneDocente || "");
        // Define as disciplinas já associadas ao docente
        if (data.disciplinas && Array.isArray(data.disciplinas)) {
          setDisciplineId(data.disciplinas.map((d: Disciplina) => d.id));
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do docente:", error);
        setError("Erro ao carregar dados do docente. Tente novamente mais tarde.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDisciplineSelection = (id: number) => {
    setDisciplineId((prev) =>
      prev.includes(id) ? prev.filter((did) => did !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formatDateForBackend = (dateString: string) => {
      const date = new Date(dateString);
      const formattedDate = date.toISOString().replace("T", " ").substring(0, 19); // yyyy-MM-dd HH:mm:ss
      return formattedDate;
    };

    if (!nomeDocente || !emailDocente || !dataNascimentoDocente || !telefoneDocente || disciplineId.length === 0) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/teacher/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeDocente,
          emailDocente,
          dataNascimentoDocente: formatDateForBackend(dataNascimentoDocente),
          telefoneDocente,
          disciplineId,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar o perfil.");

      alert("✅ Perfil atualizado com sucesso!");
      setNomeDocente("");
      setEmailDocente("");
      setDataNascimentoDocente("");
      setTelefoneDocente("");
      setPassword("");
    } catch (error) {
      console.error("❌ Erro ao atualizar aluno:", error);
      alert("Erro ao criar perfil.");
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

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-500">Editar docente</h1>
          <p className="text-gray-500">{getCurrentDate()}</p>
          <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        <div className="container mx-auto p-6 space-y-6 max-w-5xl bg-white dark:bg-black rounded-3xl">
          <Image
            src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg"
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Nome Completo", state: nomeDocente, setState: setNomeDocente },
              {
                label: "Data de Nascimento",
                state: dataNascimentoDocente,
                setState: setDataNascimentoDocente,
              },
              { label: "Email", state: emailDocente, setState: setEmailDocente },
              { label: "Telefone", state: telefoneDocente, setState: setTelefoneDocente },
              { label: "Senha", state: password, setState: setPassword },
            ].map(({ label, state, setState }) => (
              <div key={label} className="space-y-2">
                <label className="text-sm text-muted-foreground dark:text-white">{label}</label>
                <Input
                  type={label === "Data de Nascimento" ? "date" : "text"}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="bg-blue-50 dark:bg-[#141414] dark:border-[#141414] dark:text-[#F0F7FF]"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-muted-foreground mb-4">Seleção de disciplinas</h3>
              {loading ? (
                <p>Carregando disciplinas...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="space-y-3">
                  {disciplinas.map((disciplina) => (
                    <div key={disciplina.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`disciplina-${disciplina.id}`}
                        checked={disciplineId.includes(disciplina.id)}
                        onCheckedChange={() => handleDisciplineSelection(disciplina.id)}
                      />
                      <label htmlFor={`disciplina-${disciplina.id}`} className="dark:text-white">
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
              Editar docente
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}