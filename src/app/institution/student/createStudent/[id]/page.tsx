"use client";

// Importações de componentes e bibliotecas
import Sidebar from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/institution/buttonSubmit";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/institution/input";
import { useParams } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ModalCreate from "@/components/modals/modalCreate";
import InputImage from "@/components/ui/institution/InputImage";
import User from "@/assets/images/adicionar-usuario 1.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Interface para definir a estrutura de uma turma
interface Turma {
  id: number;
  nomeTurma: string;
}

// Componente principal de perfil para criação de aluno
export default function Profile({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  // Obtém parâmetros da URL
  const params = useParams();
  const id = params.id as string;

  // Estados para os campos do formulário
  const [nomeAluno, setName] = useState("");
  const [emailAluno, setEmail] = useState("");
  const [dataNascimentoAluno, setBirthDate] = useState("");
  const [telefoneAluno, setPhone] = useState("");
  const [turma, setTurma] = useState("");
  
  // Estados para tema e imagem
  const { darkMode, toggleTheme } = useTheme();
  const [imageUrl, setImagemPerfil] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para atualizar a data de nascimento (sem validação em tempo real)
  const handleDateChange = (value: string) => {
    setBirthDate(value);
  };

  // Manipulador de mudança de imagem
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Evento detectado!");

    if (!event.target.files || event.target.files.length === 0) {
      console.log("Nenhum arquivo selecionado.");
      return;
    }

    const file = event.target.files[0];
    console.log("Arquivo selecionado:", file);

    // Lê o arquivo e converte para URL de dados
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        console.log("Imagem carregada:", reader.result);
        setImagemPerfil(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Funções de validação
    const validateEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    const validatePhone = (phone: string) => {
      const regex = /^\d{10,11}$/;
      return regex.test(phone);
    };

    // Validação de campos obrigatórios
    if (!nomeAluno || !emailAluno || !dataNascimentoAluno || !telefoneAluno) {
      toast.warn("Preencha todos os campos obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    // VALIDAÇÃO DA DATA DE NASCIMENTO (APENAS NO SUBMIT)
    if (dataNascimentoAluno) {
      const birthDate = new Date(dataNascimentoAluno);
      const minDate = new Date("1900-01-01");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (birthDate < minDate) {
        toast.warn("A data de nascimento não pode ser anterior a 1900");
        setIsSubmitting(false);
        return;
      }
      if (birthDate > today) {
        toast.warn("A data de nascimento não pode ser posterior ao dia atual");
        setIsSubmitting(false);
        return;
      }
    }

    // Validações de email e telefone
    if (!validateEmail(emailAluno)) {
      toast.warn("Por favor, insira um email válido.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePhone(telefoneAluno)) {
      toast.warn("Por favor, insira um telefone válido.");
      setIsSubmitting(false);
      return;
    }

    // Verifica se o usuário está autenticado
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Usuário não autenticado. Faça login novamente.");
      setIsSubmitting(false);
      return;
    }

    try {
      setIsModalOpen(true);
      // Requisição para criar o aluno
      const response = await fetch("https://backendona-amfeefbna8ebfmbj.eastus2-01.azurewebsites.net/api/student", {
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

      // Feedback de sucesso e limpeza dos campos
      toast.success("Perfil criado com sucesso!");
      setName("");
      setEmail("");
      setBirthDate("");
      setPhone("");
      setImagemPerfil("");
    } catch (error) {
      console.error("❌ Erro ao criar perfil:", error);
      toast.error("Erro ao criar perfil.");
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  // Função para obter a data atual formatada
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("pt-BR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Efeito para aplicar o tema ao carregar a página
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Efeito para buscar informações da turma
  useEffect(() => {
    fetch(`https://backendona-amfeefbna8ebfmbj.eastus2-01.azurewebsites.net/api/class/teacher/disciplinas/${id}`)
      .then((response) => response.json())
      .then((data) => setTurma(data))
      .catch((error) => console.error("Erro ao buscar turma:", error));
  }, []);

  // Renderização do componente
  return (
    <>
      {/* Container para notificações toast */}
      <ToastContainer />
      
      {/* Layout principal */}
      <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
        {/* Barra lateral */}
        <Sidebar />
        
        {/* Conteúdo principal */}
        <main className="flex-1 p-8">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? "text-blue-500" : "text-blue-500"}`}>
                Criar Novo aluno
              </h1>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Preencha os campos abaixo para criar uma novo aluno.
              </p>
            </div>
            {/* Botão para alternar entre tema claro/escuro */}
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          {/* Formulário de criação de aluno */}
          <div className="container mx-auto p-6 space-y-6 max-w-5xl bg-white dark:bg-black rounded-3xl">
            {/* Upload de imagem */}
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

            {/* Campos do formulário */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Nome Completo",
                  state: nomeAluno,
                  setState: setName,
                },
                {
                  label: "Data de Nascimento",
                  state: dataNascimentoAluno,
                  setState: handleDateChange,
                },
                {
                  label: "Email",
                  state: emailAluno,
                  setState: setEmail,
                },
                {
                  label: "Telefone",
                  state: telefoneAluno,
                  setState: setPhone,
                  maxLength: 11,
                },
              ].map(({ label, state, setState, maxLength }) => (
                <div key={label} className="space-y-2">
                  <label className="text-sm text-muted-foreground dark:text-gray-500">
                    {label}
                  </label>
                  <Input
                    type={label === "Data de Nascimento" ? "date" : "text"}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-blue-50 dark:bg-[#141414] dark:text-white dark:border-[#141414]"
                    maxLength={maxLength}
                  />
                </div>
              ))}
            </div>

            {/* Botão de submissão */}
            <div className="flex justify-center">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Criando..." : "Criar estudante"}
              </Button>
            </div>
          </div>
          
          {/* Modal de carregamento */}
          <ModalCreate
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            message="Criando aluno..."
          />
        </main>
      </div>
    </>
  );
}