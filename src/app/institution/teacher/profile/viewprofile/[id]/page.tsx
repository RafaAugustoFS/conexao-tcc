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
import { useParams, useRouter } from "next/navigation"; // Adicionado useRouter
import { useTheme } from "@/components/ThemeProvider";
import Modal from "@/components/modals/modelDelete";

interface TeacherProfile {
  id: number;
  nomeDocente: string;
  emailDocente: string;
  dataNascimentoDocente: string;
  telefoneDocente: string;
  identifierCode: string;
  classes: Array<{
    nomeTurma: string;
    id: number;
    quantidadeAlunos: number;
  }>;
}

interface Feedback {
  titulo: string;
  conteudo: string;
  createdBy: { id: number };
  recipientTeacher: { id: number };
}

export default function User() {
  const [docenteData, setDocenteData] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { darkMode, toggleTheme } = useTheme();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const params = useParams(); // Obtém os parâmetros da URL
  const id = params.id as string; // Extrai o ID da turma da URL
  const router = useRouter(); // Adicionado useRouter para redirecionamento

  // Função para buscar os dados do docente
  const fetchDocenteData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`http://localhost:3000/api/teacher/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Não foi possível carregar os dados do docente");
      }

      const data = await response.json();
      setDocenteData(data); // Atualiza os dados do docente
    } catch (err: any) {
      setError(err.message); // Define a mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Função para deletar Docente
  const deleteTeacher = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");
  
      // Desvincula o docente das turmas
      await fetch(`http://localhost:3000/api/class-teacher?teacherId=${id}`, {
        method: "PUT", // Ou PATCH, dependendo da sua API
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teacherId: null }), // Define teacher_id como NULL
      });
  
      // Exclui o docente
      const response = await fetch(`http://localhost:3000/api/teacher/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Erro ao excluir Docente");
  
      // Redireciona para a lista de docentes após a exclusão
      router.push("/institution/teacher");
    } catch (error: any) {
      setError(error); // Armazena o objeto de erro completo
      console.error(error); // Log do erro no console para depuração
    } finally {
      setIsModalOpen(false); // Fecha o modal após a exclusão
      setSelectedClassId(null); // Reseta o ID selecionado
    }
  };
  // Função para abrir o modal e armazenar o ID do docente
  const handleDeleteClick = (teacherId: number) => {
    setSelectedClassId(teacherId);
    setIsModalOpen(true);
  };

  // Função para confirmar a exclusão no modal
  const confirmDelete = () => {
    if (selectedClassId !== null) {
      deleteTeacher(selectedClassId);
    }
  };

  // Função para buscar os feedbacks da API
  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const decoded: any = jwtDecode(token); // Decodifica o token
      const id = decoded?.sub; // Extrai o ID do usuário
      if (!id) throw new Error("ID do usuário não encontrado no token");

      const response = await fetch(`http://localhost:3000/api/feedbackStudent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Não foi possível carregar os feedbacks");
      }

      const data = await response.json();
      setFeedbacks(data); // Atualiza o estado com os feedbacks
    } catch (err: any) {
      setError(err.message); // Define a mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Busca os dados do docente e feedbacks ao montar o componente
  useEffect(() => {
    fetchDocenteData();
    fetchFeedbacks();
  }, [id]); // Adicionado `id` como dependência

  // Exibe mensagem de carregamento ou erro
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8">
          <div className="space-y-6 bg-[#FFFFFF] dark:bg-black dark:text-[#ffffffd8] p-8 rounded-2xl">
            <div className="flex items-center justify-end mb-8 w-full">
              <Button onClick={toggleTheme}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
            {docenteData && (
              <>
                <ProfileInfo
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
            <div className="space-y-4 flex flex-col pb-[30px] border-b border-[#00000050] dark:border-[#ffffff50]">
              {/* Tabela de feedbacks */}
              <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-white">Título</TableHead>
                      <TableHead className="dark:text-white">Conteúdo</TableHead>
                      <TableHead className="dark:text-white">Criado por</TableHead>
                      <TableHead className="dark:text-white">Professor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
                      feedbacks.map((feedback, index) => (
                        <TableRow key={index}>
                          <TableCell className="dark:bg-[#141414] dark:text-[#ffffffd8]">
                            {feedback.titulo}
                          </TableCell>
                          <TableCell className="dark:bg-[#141414] dark:text-[#ffffffd8]">
                            {feedback.conteudo}
                          </TableCell>
                          <TableCell className="dark:bg-[#141414] dark:text-[#ffffffd8]">
                            Aluno ID: {feedback.createdBy.id}
                          </TableCell>
                          <TableCell className="dark:bg-[#141414] dark:text-[#ffffffd8]">
                            Professor ID: {feedback.recipientTeacher.id}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center dark:text-white">
                          Nenhum feedback encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Confirmação de Exclusão */}
        <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete} // Só exclui quando confirmar
      />
      </main>
    </div>
  );
}