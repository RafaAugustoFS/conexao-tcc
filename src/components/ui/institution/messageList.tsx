import { useEffect, useState } from "react";

interface Message {
  id: number;
  conteudo: string;
  horarioSistema: string;
  nomeDocente: string;
  criadoPorNome: string;
  initials: string;
  color: string;
}

const avatarColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
];

function MessageList({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const reminderResponse = await fetch(
          `http://localhost:3000/api/reminder`
        );

        if (!reminderResponse.ok)
          throw new Error("Nenhum aviso disponível.");

        const reminders: Message[] = await reminderResponse.json();

        // Ordenando do mais recente para o mais antigo
        reminders.sort(
          (a, b) =>
            new Date(b.horarioSistema).getTime() -
            new Date(a.horarioSistema).getTime()
        );

        const updatedMessages = reminders.map((message, index) => ({
          ...message,
          color: avatarColors[index % avatarColors.length], // Alternando cores
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
    <div
      className={`bg-white dark:bg-black rounded-xl shadow-md p-4 overflow-hidden ${className} h-[320px]`}
    >
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
        <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-track-[#141414]">
          {messages.map((message, index) => (
            <div key={message.id}>
              {index > 0 && <hr className="border-gray-200 my-4" />}
              <div className="flex gap-4">
                {/* Avatar */}
                <div
                  className={`w-12 h-12 flex items-center justify-center text-white font-semibold rounded-full ${message.color}`}
                >
                  {message.initials}
                </div>
                {/* Conteúdo da Mensagem */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">
                      {message.nomeDocente ||
                        message.criadoPorNome ||
                        "Não encontrado."}
                    </h3>
                    <span className="text-gray-500 text-sm">
                      {new Date(message.horarioSistema).toLocaleString(
                        "pt-BR",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-[#8A8A8A] text-sm mt-1 max-w-3xl break-words">
                    {message.conteudo}
                  </p>
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
