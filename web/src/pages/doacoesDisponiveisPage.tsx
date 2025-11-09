import React, { useEffect, useState } from "react";
import { Doacao, listarDoacoes } from "../services/doacoesServices";

export default function DoacoesDisponiveisPage() {
    const [doacoes, setDoacoes] = useState<Doacao[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        async function carregar() {
            try {
                const data = await listarDoacoes();
                setDoacoes(data);
            } catch (err) {
                console.error("Erro ao listar doações:", err);
                setErro("Não foi possível carregar as doações.");
            } finally {
                setLoading(false);
            }
        }
        carregar();
    }, []);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-white mb-8 flex items-center gap-2">
                🧺 <span>Doações Disponíveis</span>
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
            ) : doacoes.length === 0 ? (
                <p className="text-gray-400">
                    Nenhuma doação disponível no momento. 💤
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doacoes.map((d) => (
                        <div
                            key={d.id}
                            className="bg-white/10 border border-white/10 rounded-xl p-5 shadow-md hover:shadow-purple-500/20 transition"
                        >
                            <h3 className="text-lg text-white font-bold mb-1">
                                {d.tipo} • {d.quantidade}
                            </h3>
                            <p className="text-gray-300 text-sm">
                                {d.descricao || "Sem descrição informada."}
                            </p>
                            <p className="text-gray-400 text-sm mt-3">
                                📍 {d.localidade} • 👤 {d.doador}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                Contato: <span className="text-gray-300">{d.contato}</span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
