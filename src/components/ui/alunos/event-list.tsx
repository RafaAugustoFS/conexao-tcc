import type { Event } from "../../../types/event"

interface EventListProps {
  events: Event[]
}

export function EventList({
    events,
    value,
    className,
  }: EventListProps & { value: number; className?: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Próximos eventos</h2>
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center space-x-4 p-4 rounded-2xl ` dark:bg-[#0D0D0D] dark:hover:bg-[#000000] hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-full bg-${event.color}-500 flex items-center justify-center text-white font-medium`}
            >
              {new Date(event.date).getDate()}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(event.date).getDate()} - Fev 2025 • {event.startTime} - {event.endTime}
              </p>
            </div>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}