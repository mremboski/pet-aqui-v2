import { API_URL } from "./api";
import type { Pet } from "../types/pet_type";

export type PetWithCreatedAt = Pet & {
  createdAt?: string;
};

export async function listarPets(): Promise<Pet[]> {
  const res = await fetch(`${API_URL}/pets?_sort=createdAt&_order=desc`);
  if (!res.ok) throw new Error("Erro ao listar pets");
  return res.json();
}

export async function filterPets(filtros: {
  tipo?: string;
  porte?: string;
  cor?: string;
  query?: string; 
} = {}): Promise<Pet[]> {
  const params = new URLSearchParams();


  if (filtros.tipo) params.append("tipo", filtros.tipo);
  if (filtros.porte) params.append("porte", filtros.porte);
  if (filtros.cor) params.append("cor", filtros.cor);

  params.append("_sort", "createdAt");
  params.append("_order", "desc");

  const queryString = params.toString();
  const url = `${API_URL}/pets${queryString ? `?${queryString}` : ""}`;
  
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao filtrar pets");
  
  let pets = await res.json();

  if (filtros.query) {
    const queryLower = filtros.query.toLowerCase();
    pets = pets.filter((pet: Pet) => 
      pet.cidade.toLowerCase().includes(queryLower) || 
      pet.estado.toLowerCase().includes(queryLower)
    );
  }
  
  return pets;
}

export async function getPetById(id: string): Promise<Pet | null> {
  const res = await fetch(`${API_URL}/pets/${id}`);
  if (!res.ok) return null;
  return res.json();
}


export async function cadastrarPet(pet: Omit<Pet, "id">) {
  const novo: PetWithCreatedAt = {
    ...pet,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    interesses: [],
    avaliacoes: [],
  };

  const res = await fetch(`${API_URL}/pets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novo),
  });

  if (!res.ok) throw new Error("Erro ao cadastrar pet");
  return res.json();
}


export async function addInteresse(petId: string, nomeUsuario: string) {
  const pet = await getPetById(petId);
  if (!pet) throw new Error("Pet não encontrado");
  const interesses = pet.interesses || [];
  if (!interesses.includes(nomeUsuario)) interesses.push(nomeUsuario);

  const res = await fetch(`${API_URL}/pets/${petId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interesses }),
  });
  if (!res.ok) throw new Error("Erro ao adicionar interesse");
  return res.json();
}

export async function addAvaliacao(
  petId: string,
  avaliacao: { usuario: string; nota: number; comentario?: string }
) {
  const pet = await getPetById(petId);
  if (!pet) throw new Error("Pet não encontrado");

  const avaliacoes = pet.avaliacoes || [];
  avaliacoes.push(avaliacao);

  const res = await fetch(`${API_URL}/pets/${petId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ avaliacoes }),
  });
  if (!res.ok) throw new Error("Erro ao adicionar avaliação");
  return res.json();
}

export function mediaAvaliacoes(pet: Pet): number {
  if (!pet.avaliacoes || pet.avaliacoes.length === 0) return 0;
  const total = pet.avaliacoes.reduce((s, a) => s + a.nota, 0);
  return parseFloat((total / pet.avaliacoes.length).toFixed(1));
}

export interface AvaliacaoRow {
  petId: string;
  petNome: string;
  usuario: string;
  nota: number;
  comentario?: string;
}

export async function getAllAvaliacoes(): Promise<AvaliacaoRow[]> {
  const pets = await listarPets();
  const avaliacoes: AvaliacaoRow[] = [];
  
  pets.forEach((pet) => {
    if (pet.avaliacoes && pet.avaliacoes.length > 0) {
      pet.avaliacoes.forEach((avaliacao) => {
        avaliacoes.push({
          petId: pet.id,
          petNome: pet.nome,
          usuario: avaliacao.usuario,
          nota: avaliacao.nota,
          comentario: avaliacao.comentario,
        });
      });
    }
  });
  
  // Ordenar por data mais recente (se houver createdAt, senão manter ordem)
  return avaliacoes.reverse();
}
