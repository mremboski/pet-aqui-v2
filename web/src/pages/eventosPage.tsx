import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarEventos, type Evento } from "../context/eventServices";

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarEventos().then(setEventos).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">🎊 Eventos de Adoção e Solidariedade</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-white/5 border border-white/10 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : eventos.length === 0 ? (
        <p className="text-gray-400">Nenhum evento disponível no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((ev) => (
            <Link
              key={ev.id}
              to={`/eventos/${ev.id}`}
              className="bg-white/10 border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]"
            >
              <img src={ev.imagemUrl || ev.fotoUrl} alt={ev.nome} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl text-white font-bold">{ev.nome}</h3>
                <p className="text-gray-300 text-sm mt-1">{ev.local}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(ev.data).toLocaleDateString("pt-BR")}
                  {ev.horario && ` às ${ev.horario}`}
                </p>
                <p className="text-gray-400 text-sm mt-3 line-clamp-3">{ev.descricao}</p>
                <p className="text-gray-500 text-xs mt-3">Criado por: {ev.criadoPor}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
