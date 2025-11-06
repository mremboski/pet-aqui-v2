
import axios from 'axios';
import type { Pet, Avaliacao } from '../types/pet_type';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';
const LS_KEY = 'petAqui_pets_v2';

export interface LarTemporario {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  capacidade: number;
}

export interface Evento {
  id: number;
  nome: string;
  dataISO: string; 
  local: string;
}

export interface HomeStats {
  totalPets: number;
  totalLares: number;
  totalEventosProximos: number;
  destaquePets: Pet[];
  totalInteressados: number; 
}

function isFutureOrToday(iso: string): boolean {
  try {
    const d = new Date(iso + "T00:00:00");
    const today = new Date();
    d.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return d >= today;
  } catch {
    return false;
  }
}

export async function getLares(): Promise<LarTemporario[]> {
  if (await apiAvailable()) {
    const { data } = await axios.get<LarTemporario[]>(`${BASE_URL}/lares`);
    return data;
  }
 
  return [
    { id: 1, nome: "Lar da Maria", cidade: "Porto Alegre", estado: "RS", capacidade: 2 }
  ];
}

export async function getEventos(): Promise<Evento[]> {
  if (await apiAvailable()) {
    const { data } = await axios.get<Evento[]>(`${BASE_URL}/eventos`);
    return data;
  }
  
  return [
    { id: 1, nome: "Feira de Adoção", dataISO: "2025-12-20", local: "Parque da Redenção" }
  ];
}


function ordenarPorUrgencia(a: Pet, b: Pet): number {
  const ia = (a.interesses || []).length;
  const ib = (b.interesses || []).length;

  if (ib !== ia) return ib - ia;

  const ma = mediaAvaliacoes(a);
  const mb = mediaAvaliacoes(b);
  if (ma !== mb) return ma - mb;

  return b.idade - a.idade;
}
export async function getHomeStats(): Promise<HomeStats> {
  const [pets, lares, eventos] = await Promise.all([
    getAllPets(),
    getLares(),
    getEventos()
  ]);

  const totalPets = pets.length;
  const totalLares = lares.length;
  const totalEventosProximos = eventos.filter((e) => isFutureOrToday(e.dataISO)).length;

  const totalInteressados = pets.reduce(
    (acc, p) => acc + (p.interesses ? p.interesses.length : 0),
    0
  );

  const destaquePets = [...pets].sort(ordenarPorUrgencia).slice(0, 4);


  return { totalPets, totalLares, totalEventosProximos, destaquePets, totalInteressados };
}


function normalizeTipo(t: string): string {
  const map: Record<string, string> = {
    cachorro: 'Cachorro',
    Cachorro: 'Cachorro',
    gato: 'Gato',
    Gato: 'Gato',
    outros: 'Outros',
    Outros: 'Outros',
  };
  return map[t] || t;
}

function lsLoad(): Pet[] {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) return JSON.parse(raw) as Pet[];
  return [];
}
function lsSave(list: Pet[]) { localStorage.setItem(LS_KEY, JSON.stringify(list)); }

async function apiAvailable(): Promise<boolean> {
  try { await axios.get(`${BASE_URL}/pets`, { timeout: 800 }); return true; }
  catch { return false; }
}

export async function getAllPets(): Promise<Pet[]> {
  if (await apiAvailable()) {
    const { data } = await axios.get<Pet[]>(`${BASE_URL}/pets`);
    return data;
  }
  return lsLoad();
}

export interface PetFilters {
  query?: string;
  tipo?: Pet['tipo'];
  porte?: Pet['porte'];
  cor?: string;
  idadeMin?: number;
  idadeMax?: number;
}
export async function filterPets(filters: PetFilters): Promise<Pet[]> {
  const list = await getAllPets();
  const q = filters.query?.toLowerCase();
  return list.filter(p => {
    const tipoMatch = filters.tipo ? p.tipo === filters.tipo : true;
    const porteMatch = filters.porte ? p.porte === filters.porte : true;
    const corMatch = filters.cor ? p.cor === filters.cor : true;
    const idadeMatch = (filters.idadeMin ? p.idade >= filters.idadeMin : true) && (filters.idadeMax ? p.idade <= filters.idadeMax : true);
    const queryMatch = q ? [p.nome,p.cidade,p.estado,p.raca,p.descricao].some(f=>f.toLowerCase().includes(q)) : true;
    return tipoMatch && porteMatch && corMatch && idadeMatch && queryMatch;
  });
}

export async function getPetById(id: string): Promise<Pet | undefined> {
  if (await apiAvailable()) {
    try { const { data } = await axios.get<Pet>(`${BASE_URL}/pets/${id}`); return data; } catch {}
  }
  return lsLoad().find(p=>p.id === id);
}

export async function registerPet(
  newPet: Omit<Pet, 'id' | 'interesses' | 'avaliacoes'> & { fotoUrl?: string }
): Promise<Pet> {
  const pet: Pet = {
    ...newPet,
    id: `pet-${Date.now()}`,
    tipo: normalizeTipo(newPet.tipo) as Pet['tipo'],
    fotoUrl:
      newPet.fotoUrl && newPet.fotoUrl.trim() !== ''
        ? newPet.fotoUrl
        : `https://via.placeholder.com/200/2E97B7/FFFFFF?text=${encodeURIComponent(
            'Adote ' + newPet.nome
          )}`,
    interesses: [],
    avaliacoes: [],
  };

  try {
    if (await apiAvailable()) {
      const { data } = await axios.post(`${BASE_URL}/pets`, pet);
      return data as Pet;
    }
  } catch (err) {
    console.warn('API indisponível, salvando localmente.');
  }

  const list = lsLoad();
  list.push(pet);
  lsSave(list);
  return pet;
}


export async function addInteresse(petId: string, usuario: string): Promise<void> {
  const pet = await getPetById(petId);
  if (!pet) return;
  const interesses = Array.from(new Set([...(pet.interesses || []), usuario]));
  if (await apiAvailable()) {
    await axios.patch(`${BASE_URL}/pets/${petId}`, { interesses });
  } else {
    const list = lsLoad().map(p => p.id === petId ? { ...p, interesses } : p); lsSave(list);
  }
}

export async function addAvaliacao(petId: string, avaliacao: Avaliacao): Promise<void> {
  const pet = await getPetById(petId);
  if (!pet) return;
  const avaliacoes = [ ...(pet.avaliacoes || []), avaliacao ];
  if (await apiAvailable()) {
    await axios.patch(`${BASE_URL}/pets/${petId}`, { avaliacoes });
  } else {
    const list = lsLoad().map(p => p.id === petId ? { ...p, avaliacoes } : p); lsSave(list);
  }
}

export function mediaAvaliacoes(pet: Pet): number {
  const arr = pet.avaliacoes || [];
  if (!arr.length) return 0;
  const sum = arr.reduce((acc, a) => acc + (a.nota || 0), 0);
  return parseFloat((sum / arr.length).toFixed(1));
}

export async function getAllAvaliacoes(): Promise<Array<{petId:string; petNome:string; usuario:string; nota:number; comentario?:string}>> {
  const pets = await getAllPets();
  const rows: Array<{petId:string; petNome:string; usuario:string; nota:number; comentario?:string}> = [];
  pets.forEach(p => (p.avaliacoes || []).forEach(a => rows.push({ petId: p.id, petNome: p.nome, ...a })));
  return rows;
}
