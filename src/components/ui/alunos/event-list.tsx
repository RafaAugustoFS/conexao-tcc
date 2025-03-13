import { useEffect, useState } from "react";
import type { Event } from "../../../types/event";

interface EventListProps {
  className?: string;
}

export function EventList({ className }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:3000/api/event");
        const data: Event[] = await response.json();

        // Filtra os eventos para exibir apenas os futuros
        const today = new Date().toISOString().split("T")[0];
        const upcomingEvents = data.filter((event) => event.dataEvento >= today);

        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Carregando eventos...</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Próximos eventos</h2>
      <div className="space-y-3">
        {events.length === 0 ? (
          <p>Nenhum evento futuro encontrado.</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-center space-x-4 p-4 rounded-2xl dark:bg-[#0D0D0D] dark:hover:bg-[#000000] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium"
              >
                {new Date(event.dataEvento).getDate()}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{event.tituloEvento}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(event.dataEvento).toLocaleDateString("pt-BR")} • {event.horarioEvento}
                </p>
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-full">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
