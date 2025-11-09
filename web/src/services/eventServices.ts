export interface Evento {
    id: string;
    nome: string;
    data: string;
    horario: string;
    local: string;
    descricao: string;
    tipo: "Feira de Adoção" | "Arrecadação" | "Mutirão" | "Outro";
    fotoUrl: string;
  }
  
  const STORAGE_KEY = "petAqui_eventos";
  
  export function getEventos(): Evento[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  
  export function salvarEvento(novoEvento: Omit<Evento, "id">) {
    const eventos = getEventos();
    const novo: Evento = {
      ...novoEvento,
      id: `evento-${Date.now()}`,
    };
    eventos.push(novo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
    return novo;
  }
  