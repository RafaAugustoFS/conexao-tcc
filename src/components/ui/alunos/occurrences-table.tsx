"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/alunos/table";
import { useParams } from 'next/navigation';

export function OccurrencesTable() {
  const params = useParams();
  const id = params.id as string; // Extrai o ID da URL
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (id) {
      // Faz a requisição à API
      fetch(`http://localhost:3000/api/feedbackteacher/student/${id}`)
        .then(response => response.json())
        .then(data => setFeedback(data))
        .catch(error => console.error('Erro ao buscar feedback:', error));
    }
  }, [id]);

  return (
    <div className="space-y-4 flex flex-col pb-[30px] border-b border-[#00000050] dark:border-[#ffffff50]">
      <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-white min-w-[150px]">Ocorrência</TableHead>
                <TableHead className="dark:text-white min-w-[150px]">Orientador</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedback.map((item) => (
                <TableRow key={item.id}>
                  <TableHead className="dark:bg-[#141414] dark:text-[#ffffffd8] min-w-[150px]">{item.conteudo}</TableHead>
                  <TableHead className="dark:bg-[#141414] dark:text-[#ffffffd8] min-w-[150px]">{item.teacher.nomeDocente}</TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}