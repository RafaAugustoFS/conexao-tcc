"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from "@/components/ui/alunos/table"; // Ajuste o caminho conforme necessário

interface Feedback {
  titulo: string;
  conteudo: string;
  createdBy: { id: number };
  recipientTeacher: { id: number };
}

export function FeedbackTable() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os feedbacks da API
  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch("http://localhost:3000/api/feedbacks", {
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

  // Busca os feedbacks ao montar o componente
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Exibe mensagem de carregamento ou erro
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
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
            {feedbacks.map((feedback, index) => (
              <TableRow key={index}>
                <TableHead className="dark:bg-[#141414] dark:text-[#ffffffd8]">
                  {feedback.titulo}
                </TableHead>
                <TableHead className="dark:bg-[#141414] dark:text-[#ffffffd8]">
                  {feedback.conteudo}
                </TableHead>
                <TableHead className="dark:bg-[#141414] dark:text-[#ffffffd8]">
                  Aluno ID: {feedback.createdBy.id}
                </TableHead>
                <TableHead className="dark:bg-[#141414] dark:text-[#ffffffd8]">
                  Professor ID: {feedback.recipientTeacher.id}
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}