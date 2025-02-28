
'use client';

import { FC, useEffect, useState } from 'react';
import { ArrowDownCircle, Loader } from 'lucide-react';
import {jwtDecode} from 'jwt-decode'; // Biblioteca para decodificar JWT

interface DownloadButtonProps {
  apiBaseUrl: string; // URL base da API (ex: "http://localhost:3000/api/boletim")
}

const DownloadButton: FC<DownloadButtonProps> = ({ apiBaseUrl }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        // 1. Recupera o token do localStorage
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token não encontrado');

        // 2. Decodifica o token para obter o ID do usuário
        const decoded: any = jwtDecode(token);
        const userId = decoded?.sub; // Supondo que o token contenha { id: 123 }
        if (!userId) throw new Error('ID do usuário não encontrado no token');

        // 3. Monta a URL da API com o ID do usuário
        const apiUrl = `${apiBaseUrl}/${userId}`;

        // 4. Faz a requisição para obter o arquivo PDF
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });

        if (!response.ok) throw new Error('Erro ao buscar o arquivo');

        // 5. Converte a resposta para Blob e cria uma URL temporária
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setFileUrl(url);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [apiBaseUrl]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader className="animate-spin" size={24} />
          <span>Carregando...</span>
        </div>
      ) : fileUrl ? (
        <a
          href={fileUrl}
          download="arquivo.pdf"
          className="flex items-center gap-2 border-2 border-blue-500 rounded-full px-4 py-2 text-black font-semibold hover:bg-blue-100 transition-all dark:text-white dark:hover:bg-[#141414]"
        >
          <ArrowDownCircle className="text-blue-500" size={24} />
          <span>Baixar PDF</span>
        </a>
      ) : (
        <span className="text-red-500">Erro ao carregar arquivo</span>
      )}
    </div>
  );
};

export default DownloadButton;
