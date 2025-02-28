interface Message {
    id: number;
    name: string;
    initials: string;
    color: string;
    time: string;
    text: string;
  
  }
  
  const messages: Message[] = [
    {
      id: 1,
      name: "Arthur",
      initials: "AR",
      color: "bg-orange-500",
      time: "09:34 am",
      text: "Olá, só lembrando que o prazo para a entrega do projeto final de Backend é na próxima sexta-feira! Não deixem para última hora, qualquer dúvida me chamem.",
    },
    {
      id: 2,
      name: "Giovanni",
      initials: "GI",
      color: "bg-pink-500",
      time: "12:30 pm",
      text: "Galera, atualizei o Google Drive com o material extra sobre Frontend que mencionei na aula. Dêem uma olhada para ficarem mais preparados para a próxima prova.",
    },
    {
      id: 3,
      name: "Samuel",
      initials: "SA",
      color: "bg-green-500",
      time: "15:30 pm",
      text: "Olá, pessoal! Queria parabenizar todos pela entrega do trabalho! Vi que muitos se dedicaram bastante e o resultado ficou excelente.",
    },
    {
      id: 4,
      name: "Matheus",
      initials: "MA",
      color: "bg-cyan-500",
      time: "15:30 pm",
      text: "Pessoal! Passando para lembrar que nosso trabalho foi adiado para o final de março",
    }
  ];
  
  function MessageList({ value, className }: { value: number; className?: string }) {
    return (
      <div className={`bg-white dark:bg-black rounded-xl shadow-md p-4 overflow-hidden ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Avisos</h2>
        </div>
  
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
                    <h3 className="font-bold">{message.name}</h3>
                    <span className="text-gray-500 text-sm">{message.time}</span>
                  </div>
                  <p className="text-gray-600 dark:text-[#8A8A8A] text-sm mt-1">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
  export default MessageList;