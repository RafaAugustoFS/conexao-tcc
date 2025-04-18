"use client";
import Sidebar from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/alunos/button";
import { ButtonEdit } from "@/components/ui/institution/buttonEdit";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/institution/input";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ModalCreate from "@/components/modals/modalCreate";

export default function Profile({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const params = useParams();
  const id = params.id as string;
  const { darkMode, toggleTheme } = useTheme();
  const [nome, setName] = useState("");
  const [emailAluno, setEmail] = useState("");
  const [dataNascimentoAluno, setBirthDate] = useState("");
  const [telefoneAluno, setPhone] = useState("");
  const [turmaId, setTurma] = useState("");
  const [matriculaAluno, setidentifierCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateDate = (dateString: string) => {
    if (!dateString) return true; // Se não houver data, a validação passa (ou pode retornar false se for obrigatório)
    
    const selectedDate = new Date(dateString);
    const minDate = new Date("1900-01-01");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < minDate) {
      toast.warn("A data não pode ser anterior a 1900");
      return false;
    }
    if (selectedDate > today) {
      toast.warn("A data não pode ser posterior ao dia atual");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se a data é válida apenas no submit
    if (!validateDate(dataNascimentoAluno)) {
      return;
    }

    const formatDateForBackend = (dateString: string) => {
      const date = new Date(dateString);
      const formattedDate = date
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);
      return formattedDate;
    };

    if (!nome || !emailAluno || !dataNascimentoAluno || !telefoneAluno) {
      toast.warn("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsModalOpen(true);
      const response = await fetch(`http://localhost:3000/api/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeAluno: nome,
          emailAluno,
          dataNascimentoAluno,
          telefoneAluno,
          turmaId,
          matriculaAluno,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar o perfil.");

      toast.success("✅ Perfil atualizado com sucesso!");
      setName("");
      setEmail("");
      setBirthDate("");
      setPhone("");
      setidentifierCode("");
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

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/api/student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.imageUrl);
        setName(data.nome || "");
        setEmail(data.emailAluno || "");
        setBirthDate(data.dataNascimentoAluno || "");
        setPhone(data.telefoneAluno || "");
        setTurma(data.turmaId);
        setidentifierCode(data.matriculaAluno);
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

        <div className="container mx-auto p-6 space-y-6 max-w-5xl bg-white dark:bg-black rounded-3xl">
          <Image
            src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg"
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-gray-400">
            {[
              { label: "Nome Completo", state: nome, setState: setName },
              {
                label: "Data de Nascimento",
                state: dataNascimentoAluno,
                setState: setBirthDate,
              },
              { label: "Email", state: emailAluno, setState: setEmail },
              { label: "Telefone", state: telefoneAluno, setState: setPhone },
              {
                label: "Matrícula",
                state: matriculaAluno,
                setState: setidentifierCode,
              },
            ].map(({ label, state, setState }) => (
              <div key={label} className="space-y-2">
                <label className="text-sm text-muted-foreground">{label}</label>
                <Input
                  type={label === "Data de Nascimento" ? "date" : "text"}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="bg-blue-50 dark:bg-[#141414]"
                  min={label === "Data de Nascimento" ? "1900-01-01" : undefined}
                  max={label === "Data de Nascimento" ? getTodayDateString() : undefined}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <ButtonEdit
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
            >
              Editar estudante
            </ButtonEdit>
          </div>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
}