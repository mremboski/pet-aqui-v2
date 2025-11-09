import { API_URL } from "./api";

export type Doacao = {
  id: string;
  doador: string;
  contato: string;
  localidade: string;
  tipo: string;
  quantidade: string;
  descricao?: string;
  createdAt: string;
};

const BASE_URL = `${API_URL.replace(/\/$/, "")}/doacoes`;

export async function listarDoacoes(): Promise<Doacao[]> {
  const res = await fetch(`${BASE_URL}?_sort=createdAt&_order=desc`);
  if (!res.ok) throw new Error("Erro ao buscar doações");
  return res.json();
}

export async function cadastrarDoacao(d: Omit<Doacao, "id" | "createdAt">) {
  try {
    const nova: Doacao = {
      ...d,
      id: self.crypto?.randomUUID?.() || Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nova),
    });

    if (!res.ok) throw new Error("Erro ao cadastrar doação");
    return await res.json();
  } catch (err) {
    console.error("❌ Erro no cadastro de doação:", err);
    throw new Error("Falha ao cadastrar doação.");
  }
}
