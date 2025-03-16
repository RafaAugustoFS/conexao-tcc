"use client";
import  Sidebar  from "@/components/layout/sidebarInstitution"
import  ProfileForm  from "@/components/ui/institution/profile"
import { Button } from "@/components/ui/alunos/button"
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/institution/input";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";


export default function Profile({ value, className }: { value: number; className?: string }) {
  const params = useParams(); // Obtém os parâmetros da URL
  const id = params.id as string; // Extrai o ID da turma da URL
  const { darkMode, toggleTheme } = useTheme(); 
  const [nome, setName] = useState("");
  const [emailAluno, setEmail] = useState("");
  const [dataNascimentoAluno, setBirthDate] = useState("");
  const [telefoneAluno, setPhone] = useState("");
  const [turmaId, setTurma] = useState("");
  const [matriculaAluno, setidentifierCode] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formatDateForBackend = (dateString: string) => {
      const date = new Date(dateString);
      const formattedDate = date.toISOString().replace("T", " ").substring(0, 19); // yyyy-MM-dd HH:mm:ss
      return formattedDate;
    };

    if (!nome || !emailAluno || !dataNascimentoAluno || !telefoneAluno) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nomeAluno:nome,
          emailAluno,
          dataNascimentoAluno: formatDateForBackend(dataNascimentoAluno),
          telefoneAluno,
          turmaId,
          matriculaAluno,
          password
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar o perfil.");

      alert("✅ Perfil atualizado com sucesso!");
      setName("");
      setEmail("");
      setBirthDate("");
      setPhone("");
      setidentifierCode("");
      setPassword("");
    } catch (error) {
        console.error("❌ Erro ao atualizar aluno:", error);
      alert("Erro ao criar perfil.");
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('pt-BR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (!id) return; // Se não houver ID, não faz a requisição
  
    fetch(`http://localhost:3000/api/student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.nome || "");
        setEmail(data.emailAluno || "");
        setBirthDate(data.dataNascimentoAluno || "");
        setPhone(data.telefoneAluno || "");
        setTurma(data.turmaId),
        setidentifierCode(data.matriculaAluno)
      })
      .catch((error) => console.error("Erro ao buscar turma:", error));
  }, [id]);
  
  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold dark:text-white">Editar aluno</h1>
          <p className="text-gray-500">{getCurrentDate()}</p>
          <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        <div className="container mx-auto p-6 space-y-6 max-w-5xl bg-white dark:bg-gray-800 rounded-3xl">
          <Image
            src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg"
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Nome Completo", state: nome, setState: setName },
              {
                label: "Data de Nascimento",
                state: dataNascimentoAluno,
                setState: setBirthDate,
              },
              { label: "Email", state: emailAluno, setState: setEmail },
              { label: "Telefone", state: telefoneAluno, setState: setPhone },
              { label: "Matrícula", state: matriculaAluno, setState: setidentifierCode },
              { label: "Senha", state: password, setState: setPassword },
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

          <div className="flex justify-center">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              onClick={handleSubmit}
            >
              Editar estudante
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}