const timeSlots = [
    { start: "09:00", end: "11:00" },
    { start: "11:00", end: "13:00" },
    { start: "13:00", end: "15:00" },
    { start: "15:00", end: "17:00" },
    { start: "17:00", end: "19:00" },
  ]
  
  const upcomingEvents = [
    { id: 8, title: "Inicio das aulas", date: "8 - Fev 2025", time: "8 A.M - 9 A.M", color: "bg-blue-500" },
    { id: 13, title: "Clube do livro", date: "13 - Fev 2025", time: "8 A.M - 9 A.M", color: "bg-pink-500" },
    { id: 18, title: "Entrega das apostilas", date: "18 - Fev 2025", time: "8 A.M - 9 A.M", color: "bg-green-500" },
    { id: 23, title: "Feira cultural", date: "18 - Fev 2025", time: "8 A.M - 9 A.M", color: "bg-orange-500" },
  ]
  
  export function EventSidebar() {
    return (
      <div className="w-96 p-6 space-y-6 ">

        <div className="bg-[#FFFFFF] dark:bg-black pt-8 pl-16 pr-16 pb-8 rounded-[20px]">
        <div>
          <h3 className=" dark:text-white text-lg font-semibold mb-2">Sobre o Evento</h3>
          <p className="text-sm text-muted-foreground dark:text-[#D0CECE]">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Adipiscing luctus lectus purus mi, diam lacus.
          </p>
        </div>
  
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Horário</h3>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <div
                key={slot.start}
                className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded p-2 text-center"
              >
                {slot.start} às {slot.end}
              </div>
            ))}
          </div>
        </div>
  
        <div>
          <p className=" pt-4 text-sm mb-4 dark:text-[#D0CECE]">
            Cotia SP, Senai Ricardo Lerner
            <br />
            06708-280
          </p>
        </div>

        </div>
        <div className="bg-[#FFFFFF] dark:bg-black pt-8 pl-16 pr-16 pb-5 rounded-[20px]">
          <h3 className="text-lg font-semibold mb-4 dark:text-[#D0CECE]">Proximos Eventos</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                <div className={`w-8 h-8 ${event.color} rounded-full flex items-center justify-center text-white`}>
                  {event.id}
                </div>
                <div>
                  <p className="font-medium dark:text-white">{event.title}</p>
                  <p className="text-xs text-muted-foreground dark:text-white">
                    {event.date} • {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  