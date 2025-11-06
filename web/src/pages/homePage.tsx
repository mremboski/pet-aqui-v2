import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  HomeModernIcon,
  MegaphoneIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { getHomeStats } from "../services/petServices";
import type { Pet } from "../types/pet_type";

function StatCard({
  icon: Icon,
  label,
  value,
  route,
}: {
  icon: typeof HeartIcon;
  label: string;
  value: string | number;
  route: string;
}) {
  return (
    <Link
      to={route}
      className="bg-[#111] border border-gray-800 p-6 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300 group"
    >
      <Icon className="h-10 w-10 text-purple-400 mb-3 group-hover:text-indigo-400 transition" />
      <p className="text-sm font-medium text-gray-300">{label}</p>
      <p className="text-3xl font-extrabold text-white mt-1">{value}</p>
    </Link>
  );
}

function PetDestaqueCard({ pet }: { pet: Pet }) {
  return (
    <Link
      to={`/adote/${pet.id}`}
      className="bg-[#111] border border-gray-800 p-4 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition duration-300"
    >
      <img
        src={pet.fotoUrl}
        alt={pet.nome}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h4 className="text-xl font-bold text-white">{pet.nome}</h4>
      <p className="text-sm text-gray-300">
        {pet.cidade}, {pet.estado}
      </p>
    </Link>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [totalPets, setTotalPets] = useState(0);
  const [totalLares, setTotalLares] = useState(0);
  const [totalEventos, setTotalEventos] = useState(0);
  const [totalInteressados, setTotalInteressados] = useState(0);
  const [destaques, setDestaques] = useState<Pet[]>([]);

  useEffect(() => {
    let ativo = true;

    async function carregarStats() {
      try {
        setLoading(true);
        const s = await getHomeStats();
        if (!ativo) return;
        setTotalPets(s.totalPets);
        setTotalLares(s.totalLares);
        setTotalEventos(s.totalEventosProximos);
        setTotalInteressados(s.totalInteressados);
        setDestaques(s.destaquePets);
      } finally {
        setLoading(false);
      }
    }

    carregarStats();
    const interval = setInterval(carregarStats, 10000);
    return () => {
      ativo = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="p-6 md:p-10">
      <header className="relative text-center mb-16 py-20 rounded-3xl overflow-hidden border border-purple-900/40 shadow-[0_0_40px_rgba(139,92,246,0.25)] bg-gradient-to-br from-[#10001f] via-[#0a0010] to-[#000814]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/20 via-indigo-600/10 to-blue-600/20 blur-3xl animate-pulse"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            Bem-vindo(a) ao{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 animate-gradient-x">
              PET AQUI!
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Seu portal de adoção e ajuda animal no Rio Grande do Sul.
          </p>

          <Link
            to="/adote"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold text-lg shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] transition-all duration-300"
          >
            🐾 Encontre Seu Novo Amigo Agora!
          </Link>
        </div>
      </header>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StatCard
            icon={HeartIcon}
            label="Pets disponíveis para Adoção"
            value={loading ? "..." : totalPets}
            route="/adote"
          />
          <StatCard
            icon={HomeModernIcon}
            label="Lares Temporários Cadastrados"
            value={loading ? "..." : totalLares}
            route="/lar-temporario"
          />
          <StatCard
            icon={MegaphoneIcon}
            label="Eventos de Adoção Próximos"
            value={loading ? "..." : totalEventos}
            route="/eventos"
          />
          <StatCard
            icon={HeartIcon}
            label="Pessoas Interessadas em Pets"
            value={loading ? "..." : totalInteressados}
            route="/adote"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-purple-800/40 pb-2">
          Destaques da Semana
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              Pets em Maior Urgência
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {loading
                ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-40 bg-white/5 rounded-xl border border-gray-700 animate-pulse"
                  />
                ))
                : destaques.map((p) => (
                  <PetDestaqueCard key={p.id} pet={p} />
                ))}
            </div>
            <Link
              to="/adote"
              className="mt-6 inline-flex items-center text-purple-400 font-semibold hover:text-indigo-400 transition"
            >
              Ver todos os pets <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>

          <div className="bg-[#111] border border-gray-800 p-6 rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.15)]">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">
              Próximas Feiras e Notícias
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>
                Veja a agenda completa em{" "}
                <Link
                  to="/eventos"
                  className="text-purple-400 hover:text-indigo-400 underline"
                >
                  Eventos
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
