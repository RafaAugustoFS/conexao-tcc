import { User } from "../../components/ui/alunos/user";
import { Calendar } from "../../components/ui/alunos/calendar";
import { EventList } from "../../components/ui/alunos/event-list";
import type { Event } from "../../types/event";

const events: Event[] = [
  {
    id: 1,
    title: "Inicio das aulas",
    date: new Date(2025, 1, 8),
    startTime: "8 A.M",
    endTime: "9 A.M",
    color: "blue",
  },
  {
    id: 2,
    title: "Clube do livro",
    date: new Date(2025, 1, 13),
    startTime: "8 A.M",
    endTime: "9 A.M",
    color: "pink",
  },
  {
    id: 3,
    title: "Entrega das apostilas",
    date: new Date(2025, 1, 18),
    startTime: "8 A.M",
    endTime: "9 A.M",
    color: "green",
  },
  {
    id: 4,
    title: "Feira cultural",
    date: new Date(2025, 1, 23),
    startTime: "10 A.M",
    endTime: "1 P.M",
    color: "orange",
  },
];

const calendarEvents = events.map((event) => ({
  date: event.date.getDate(),
  color: event.color,
}));

export default function LateralCalendar() {
  return (
    <div className="bg-white dark:bg-black rounded-l-[20px]">
      <div className="max-w-md mx-auto p-4">
        <User />
        <Calendar events={calendarEvents} />
        <EventList events={events} value={0} />
      </div>
    </div>
  );
}
