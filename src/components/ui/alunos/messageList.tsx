import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface Message {
  id: number;
  conteudo: string;
  horarioSistema: string;
  nomeDocente: string;
  criadoPorNome: string;
  initials: string;
  classStId: number;
  color: string;
}

function MessageList({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lista de cores para os avatares
  const avatarColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
  ];

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const reminderResponse = await fetch(`http://localhost:3000/api/reminder`);

        if (!reminderResponse.ok) throw new Error("Erro ao buscar avisos da turma");

        const reminders: Message[] = await reminderResponse.json();

        // Adicionando a cor para cada mensagem
        const updatedMessages = reminders.map((message, index) => ({
          ...message,
          color: avatarColors[index % avatarColors.length], // Cor alternada com base no índice
        }));

        setMessages(updatedMessages);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar avisos");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className={`bg-white dark:bg-black rounded-xl shadow-md p-4 overflow-hidden ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Avisos</h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Carregando avisos...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum aviso disponível.</p>
      ) : (
        <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          {messages.map((message, index) => (
            <div key={message.id}>
              {index > 0 && <hr className="border-gray-200 my-4" />}
              <div className="flex gap-4">
                {/* Avatar */}
                <div className={`w-12 h-12 flex items-center justify-center text-white font-semibold rounded-full ${message.color}`}>
                  {message.initials}
                </div>
                {/* Conteúdo da Mensagem */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{message.nomeDocente || message.criadoPorNome || "Não encontrado."}</h3>
                    <span className="text-gray-500 text-sm">
                      {new Date(message.horarioSistema).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-[#8A8A8A] text-sm mt-1">{message.conteudo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageList;
