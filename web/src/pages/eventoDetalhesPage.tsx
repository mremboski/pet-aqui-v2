import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
    obterEvento,
    adicionarComentario,
    avaliarEvento,
    confirmarPresenca,
    type Evento,
} from "../context/eventServices";
import { useAuth } from "../context/AuthContext";

export default function EventoDetalhesPage() {
    const { eventoId } = useParams<{ eventoId: string }>();
    const { usuario, loading: authLoading } = useAuth();

    const [ev, setEv] = useState<Evento | null>(null);
    const [loading, setLoading] = useState(true);
    const [comentario, setComentario] = useState("");
    const [nota, setNota] = useState(0);

    const load = useCallback(async () => {
        if (!eventoId) return;
        setLoading(true);
        try {
            const e = await obterEvento(eventoId);
            if (e) {
                setEv(e);
                const minha = e.avaliacoes?.find((a) => a.usuarioId === usuario?.id);
                setNota(minha?.estrelas || 0);
            }
        } finally {
            setLoading(false);
        }
    }, [eventoId, usuario?.id]);

    useEffect(() => {
        load();
    }, [load]);

    const media = useMemo(() => {
        if (!ev?.avaliacoes?.length) return "N/A";
        const m = ev.avaliacoes.reduce((s, a) => s + a.estrelas, 0) / ev.avaliacoes.length;
        return m.toFixed(1);
    }, [ev]);

    if (loading || authLoading) {
        return <div className="p-8 text-gray-400">Carregando...</div>;
    }
    if (!ev) {
        return <div className="p-8 text-gray-400">Evento não encontrado.</div>;
    }

    async function onComentar() {
        if (!usuario) return alert("Faça login para comentar.");
        if (!comentario.trim()) return;
        if (!ev) return;
        await adicionarComentario(ev.id, { id: usuario.id, nomeCompleto: usuario.nomeCompleto }, comentario.trim());
        setComentario("");
        await load();
    }

    async function onAvaliar(n: number) {
        if (!usuario) return alert("Faça login para avaliar.");
        if (!ev) return;
        setNota(n);
        await avaliarEvento(ev.id, { id: usuario.id }, n);
        await load();
    }

    async function onConfirmar() {
        if (!usuario) return alert("Faça login para confirmar presença.");
        if (!ev) return;
        await confirmarPresenca(ev.id, { id: usuario.id });
        await load();
    }

    const confirmados = ev.confirmados?.length || 0;
    const fotoUrl = ev.fotoUrl || ev.imagemUrl;
    const horario = ev.horario || "";

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <img src={fotoUrl} alt={ev.nome} className="w-full h-64 object-cover rounded-xl border border-white/10 mb-6" />
            <h1 className="text-3xl font-bold text-white">{ev.nome}</h1>
            <p className="text-gray-400 mt-1">
                📍 {ev.local} • 🗓 {new Date(ev.data).toLocaleDateString("pt-BR")}
                {horario && ` às ${horario}`}
            </p>
            <p className="text-gray-300 mt-4">{ev.descricao}</p>

            <div className="flex items-center gap-3 mt-6">
                <button onClick={onConfirmar} className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">
                    Confirmar Presença
                </button>
                <span className="text-gray-400 text-sm">{confirmados} pessoa(s) confirmada(s)</span>
            </div>

            <div className="mt-8">
                <h2 className="text-xl text-white font-bold mb-2">Avaliações</h2>
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                        <button
                            key={n}
                            onClick={() => onAvaliar(n)}
                            className={`text-2xl ${n <= nota ? "text-yellow-400" : "text-gray-600"}`}
                            aria-label={`Avaliar ${n} estrela(s)`}
                        >
                            ★
                        </button>
                    ))}
                    <span className="text-gray-400 ml-2 text-sm">Média: {media}</span>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl text-white font-bold mb-2">Comentários</h2>
                <label htmlFor="comentario-evento" className="sr-only">
                    Escreva seu comentário
                </label>
                <textarea
                    id="comentario-evento"
                    className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-gray-100 mb-2"
                    rows={3}
                    placeholder="Escreva seu comentário..."
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    aria-label="Campo de comentário do evento"
                />
                <button onClick={onComentar} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Comentar
                </button>

                <div className="mt-4 space-y-3">
                    {ev.comentarios && ev.comentarios.length > 0
                        ? ev.comentarios.slice().reverse().map((c) => (
                            <div key={c.id} className="bg-white/5 p-3 rounded-lg border border-white/10">
                                <p className="text-sm text-gray-300 font-semibold">{c.autorNome}</p>
                                <p className="text-gray-400 text-sm">{c.mensagem}</p>
                                <p className="text-gray-500 text-xs mt-1">{new Date(c.createdAt).toLocaleString("pt-BR")}</p>
                            </div>
                        ))
                        : <p className="text-gray-500 text-sm">Ainda não há comentários.</p>}
                </div>
            </div>
        </div>
    );
}
