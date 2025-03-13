export interface Event {
  id: number;
  tituloEvento: string; // Título do evento
  dataEvento: string; // Data do evento (formato YYYY-MM-DD)
  horarioEvento: string; // Horário do evento
  localEvento: string; // Local do evento
  descricaoEvento: string; // Descrição do evento
  startTime: string; // Hora de início
  endTime: string; // Hora de término
  color: "blue" | "pink" | "green" | "orange"; // Cores permitidas
}
