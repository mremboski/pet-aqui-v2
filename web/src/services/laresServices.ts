import { API_URL } from "./api";

export type LarTemporario = {
  id: string;
  nomeVoluntario: string;
  telefone: string;
  email: string;
  localidade: string;
  capacidade: string;
  aceita: string;
  experiencia?: string;
  createdAt: string;
};

const BASE_URL = `${API_URL.replace(/\/$/, "")}/lares`;

export async function listarLares(): Promise<LarTemporario[]> {
  const res = await fetch(`${BASE_URL}?_sort=createdAt&_order=desc`);
  if (!res.ok) throw new Error("Erro ao buscar lares");
  return res.json();
}

export async function cadastrarLar(l: Omit<LarTemporario, "id" | "createdAt">) {
  try {
    const novo: LarTemporario = {
      ...l,
      id: self.crypto?.randomUUID?.() || Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo),
    });

    if (!res.ok) throw new Error("Erro ao cadastrar lar temporário");
    return await res.json();
  } catch (err) {
    console.error("❌ Erro no cadastro de lar:", err);
    throw new Error("Falha ao cadastrar lar temporário.");
  }
}
