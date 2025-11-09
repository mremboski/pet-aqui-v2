import React, { useEffect, useState } from "react";
import { listarEventos } from "../../context/eventServices";
import { listarDoacoes } from "../../services/doacoesServices";
import { listarLares } from "../../services/laresServices";

export default function AdminDashboardPage() {
    const [cards, setCards] = useState({ eventos: 0, doacoes: 0, lares: 0 });

    useEffect(() => {
        Promise.all([listarEventos(), listarDoacoes(), listarLares()]).then(([ev, doac, lar]) =>
            setCards({ eventos: ev.length, doacoes: doac.length, lares: lar.length })
        );
    }, []);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl text-white font-bold mb-6">Painel Admin</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-400 text-sm">Eventos</p>
                    <p className="text-3xl text-white font-extrabold">{cards.eventos}</p>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-400 text-sm">Doações</p>
                    <p className="text-3xl text-white font-extrabold">{cards.doacoes}</p>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-400 text-sm">Lares</p>
                    <p className="text-3xl text-white font-extrabold">{cards.lares}</p>
                </div>
            </div>
            <p className="text-gray-500 text-sm mt-6">Próximos passos: tabelas com CRUD (aprovar/editar/excluir) por tipo.</p>
        </div>
    );
}
