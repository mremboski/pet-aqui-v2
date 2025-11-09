import { api } from "../services/api";

export interface Comentario {
    id: string;
    autorNome: string;
    mensagem: string;
    createdAt: string;
}

export interface AvaliacaoEvento {
    usuarioId: string;
    estrelas: number;
}

export type Evento = {
    id: string;
    nome: string;
    data: string;
    local: string;
    descricao: string;
    imagemUrl: string;
    fotoUrl?: string; // Alias para compatibilidade
    horario?: string;
    criadoPor: string;
    createdAt: string;
    comentarios?: Comentario[];
    avaliacoes?: AvaliacaoEvento[];
    confirmados?: string[]; // IDs dos usuários que confirmaram presença
};

export async function listarEventos(): Promise<Evento[]> {
    return api<Evento[]>("/eventos?_sort=createdAt&_order=desc");
}

export async function obterEvento(id: string): Promise<Evento | null> {
    try {
        return await api<Evento>(`/eventos/${id}`);
    } catch {
        return null;
    }
}

export async function cadastrarEvento(evento: Omit<Evento, "id" | "createdAt">) {
    const novo: Evento = {
        ...evento,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        comentarios: [],
        avaliacoes: [],
        confirmados: [],
    };
    return api("/eventos", {
        method: "POST",
        body: novo,
    });
}

export async function adicionarComentario(
    eventoId: string,
    usuario: { id: string; nomeCompleto: string },
    mensagem: string
): Promise<Evento> {
    const evento = await obterEvento(eventoId);
    if (!evento) throw new Error("Evento não encontrado");

    const comentarios = evento.comentarios || [];
    comentarios.push({
        id: crypto.randomUUID(),
        autorNome: usuario.nomeCompleto,
        mensagem,
        createdAt: new Date().toISOString(),
    });

    return api<Evento>(`/eventos/${eventoId}`, {
        method: "PATCH",
        body: { comentarios },
    });
}

export async function avaliarEvento(
    eventoId: string,
    usuario: { id: string },
    estrelas: number
): Promise<Evento> {
    const evento = await obterEvento(eventoId);
    if (!evento) throw new Error("Evento não encontrado");

    const avaliacoes = evento.avaliacoes || [];
    const index = avaliacoes.findIndex((a) => a.usuarioId === usuario.id);

    if (index >= 0) {
        avaliacoes[index].estrelas = estrelas;
    } else {
        avaliacoes.push({ usuarioId: usuario.id, estrelas });
    }

    return api<Evento>(`/eventos/${eventoId}`, {
        method: "PATCH",
        body: { avaliacoes },
    });
}

export async function confirmarPresenca(
    eventoId: string,
    usuario: { id: string }
): Promise<Evento> {
    const evento = await obterEvento(eventoId);
    if (!evento) throw new Error("Evento não encontrado");

    const confirmados = evento.confirmados || [];
    if (!confirmados.includes(usuario.id)) {
        confirmados.push(usuario.id);
    }

    return api<Evento>(`/eventos/${eventoId}`, {
        method: "PATCH",
        body: { confirmados },
    });
}
