import React, { useEffect, useState } from "react";
import { LarTemporario, listarLares } from "../services/laresServices";

export default function LaresTemporariosListPage() {
    const [lares, setLares] = useState<LarTemporario[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        async function carregar() {
            try {
                const data = await listarLares();
                setLares(data);
            } catch (err) {
                console.error("Erro ao listar lares:", err);
                setErro("Não foi possível carregar os lares temporários.");
            } finally {
                setLoading(false);
            }
        }
        carregar();
    }, []);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-white mb-8 flex items-center gap-2">
                🏡 <span>Lares Temporários</span>
            </h1>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-40 rounded-xl bg-white/5 border border-white/10 animate-pulse"
                        />
                    ))}
                </div>
            ) : erro ? (
                <p className="text-red-400">{erro}</p>
            ) : lares.length === 0 ? (
                <p className="text-gray-400">Nenhum lar temporário cadastrado. 💤</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {lares.map((l) => (
                        <div
                            key={l.id}
                            className="bg-white/10 border border-white/10 rounded-xl p-5 shadow-md hover:shadow-purple-500/20 transition"
                        >
                            <h3 className="text-lg text-white font-bold mb-1">
                                {l.nomeVoluntario}
                            </h3>
                            <p className="text-gray-300 text-sm mb-1">
                                📍 {l.localidade} | Capacidade: {l.capacidade}
                            </p>
                            <p className="text-gray-300 text-sm mb-1">
                                Aceita: {l.aceita || "Não especificado"}
                            </p>
                            <p className="text-gray-400 text-sm mb-2">
                                {l.experiencia || "Sem observações adicionais."}
                            </p>
                            <p className="text-gray-500 text-xs">
                                Contato:{" "}
                                <span className="text-gray-300">
                                    {l.telefone} • {l.email}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
