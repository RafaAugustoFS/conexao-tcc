import { FC, useState } from 'react';
import { ArrowDownCircle, Loader } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

interface DownloadButtonProps {
  apiBaseUrl: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({ apiBaseUrl }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      // Obtém o token do localStorage
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      // Decodifica o token para obter o ID do usuário
      const decoded: any = jwtDecode(token);
      const userId = decoded?.sub;
      if (!userId) throw new Error('ID do usuário não encontrado no token');

      // Monta a URL da API
      const apiUrl = `${apiBaseUrl}/${userId}`;

      // Faz a requisição para obter o PDF
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar o arquivo');

      // Converte a resposta para Blob e cria uma URL temporária
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setFileUrl(url);

      // Aciona o download automaticamente
      const link = document.createElement('a');
      link.href = url;
      link.download = 'boletim.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      setFileUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 border-2 border-blue-500 rounded-full px-4 py-2 text-black font-semibold hover:bg-blue-100 transition-all dark:text-white dark:hover:bg-[#141414]"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader className="animate-spin" size={24} />
          <span>Baixando...</span>
        </>
      ) : (
        <>
          <ArrowDownCircle className="text-blue-500" size={24} />
          <span>Baixar PDF</span>
        </>
      )}
    </button>
  );
};

export default DownloadButton;
