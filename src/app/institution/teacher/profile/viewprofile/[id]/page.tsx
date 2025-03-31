"use client";
import Sidebar from "@/components/layout/sidebarInstitution";
import { ProfileInfo } from "@/components/ui/teacher/profile";
import { Button } from "@/components/ui/alunos/button";
import { Moon, Sun, Pencil, Ban } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/alunos/table";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import Modal from "@/components/modals/modelDelete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TeacherProfile {
  id: number;
  imageUrl: string;
  nomeDocente: string;
  emailDocente: string;
  dataNascimentoDocente: string;
  telefoneDocente: string;
  identifierCode: string;
  classes: Array<{ nomeTurma: string; id: number; quantidadeAlunos: number }>;
}

interface Feedback {
  conteudo: string;
  createdBy: { nomeAluno: string }; // Corrigido para incluir o nome do aluno
  recipientTeacher: { id: number };
}

export default function User() {
  const [docenteData, setDocenteData] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { darkMode, toggleTheme } = useTheme();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(
    null
  );
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  // Função para buscar os dados do docente
  const fetchDocenteData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`http://localhost:3000/api/teacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Não foi possível carregar os dados do docente");
      }

      const data = await response.json();
      setDocenteData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar o docente
  const deleteTeacher = async (teacherId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      await fetch(`http://localhost:3000/api/class-teacher?teacherId=${teacherId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ teacherId: null }),
      });

      const response = await fetch(`http://localhost:3000/api/teacher/${teacherId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Erro ao excluir docente");

      toast.success("Docente excluído com sucesso!");
      setTimeout(() => {
        router.push("/institution/teacher");
      }, 2000);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsModalOpen(false);
      setSelectedTeacherId(null);
    }
  };

  const handleDeleteClick = (teacherId: number) => {
    setSelectedTeacherId(teacherId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTeacherId !== null) {
      deleteTeacher(selectedTeacherId);
    }
  };

  // Função para buscar os feedbacks
  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`http://localhost:3000/api/feedbackStudent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Não foi possível carregar os feedbacks");
      }

      const data = await response.json();
      setFeedbacks(Array.isArray(data) ? data : [data]); // Garante que é um array
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocenteData();
    fetchFeedbacks();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <>
      <ToastContainer />
      <div className={`flex flex-row ${darkMode ? "bg-[#141414]" : "bg-[#F0F7FF]"} min-h-screen`}>
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="space-y-6 bg-white dark:bg-black dark:text-white p-8 rounded-2xl">
            <div className="flex items-center justify-end">
              <Button onClick={toggleTheme}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>

            {docenteData && (
              <>
                <ProfileInfo
                  imageUrl={docenteData.imageUrl}
                  name={docenteData.nomeDocente}
                  email={docenteData.emailDocente}
                  birthDate={docenteData.dataNascimentoDocente}
                  phone={docenteData.telefoneDocente}
                  registrationNumber={docenteData.identifierCode}
                  classes={docenteData.classes.map((classe) => classe.nomeTurma)}
                />

                <div className="w-full flex flex-row justify-end space-x-4 pr-8">
                  <Link href={`/institution/teacher/profile/editprofile/${docenteData.id}`}>
                    <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                      <Pencil size={20} />
                    </button>
                  </Link>
                  <button
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    onClick={() => handleDeleteClick(docenteData.id)}
                  >
                    <Ban size={20} />
                  </button>
                </div>
              </>
            )}

            <div className="space-y-4 pb-6 border-b border-gray-500 dark:border-gray-600">
              <h2 className="text-lg font-bold dark:text-white">Feedbacks</h2>

              <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Conteúdo</TableHead>
                      <TableHead>Criado por</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedbacks.length > 0 ? (
                      feedbacks.map((feedback, index) => (
                        <TableRow key={index}>
                          <TableCell>{feedback.conteudo}</TableCell>
                          <TableCell>{feedback.createdBy?.nomeAluno || "Desconhecido"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center">Nenhum feedback encontrado.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} />
        </main>
      </div>
    </>
  );
}
