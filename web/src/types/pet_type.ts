
export type Tipo = 'Cachorro' | 'Gato' | 'Outros';
export type Porte = 'Pequeno' | 'Médio' | 'Grande';

export interface Avaliacao {
  usuario: string;
  nota: number; // 1..5
  comentario?: string;
}

export interface Pet {
  id: string;
  nome: string;
  tipo: Tipo;
  raca: string;
  idade: number;
  porte: Porte;
  cor: string;
  cidade: string;
  estado: string;
  saude?: string;
  temperamento?: string;
  descricao: string;
  fotoUrl: string; // Base64 ou URL
  interesses?: string[]; // nomes de usuários
  avaliacoes?: Avaliacao[];
}
