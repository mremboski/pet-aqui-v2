import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  HomeModernIcon,
  MegaphoneIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { listarEventos } from "../context/eventServices";
import { listarDoacoes } from "../services/doacoesServices";
import { listarLares } from "../services/laresServices";
import { listarPets } from "../services/petServices";
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

function CardPet({ pet }: { pet: Pet }) {
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
  const [pets, setPets] = useState<Pet[]>([]);
  const [lares, setLares] = useState<any[]>([]);
  const [doacoes, setDoacoes] = useState<any[]>([]);
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    async function carregarTudo() {
      setLoading(true);
      try {

        const [p, l, d, e] = await Promise.all([
          listarPets(),
          listarLares(),
          listarDoacoes(),
          listarEventos(),
        ]);
        setPets(p.slice(0, 4) as Pet[]);
        setLares(l.slice(0, 4));
        setDoacoes(d.slice(0, 4));
        setEventos(e.slice(0, 4));
      } catch (err) {
        console.error("Erro ao carregar dados da home:", err);
      } finally {
        setLoading(false);
      }
    }
    carregarTudo();
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
            label="Pets disponíveis"
            value={loading ? "..." : pets.length}
            route="/adote"
          />
          <StatCard
            icon={HomeModernIcon}
            label="Lares temporários"
            value={loading ? "..." : lares.length}
            route="/lares"
          />
          <StatCard
            icon={MegaphoneIcon}
            label="Eventos"
            value={loading ? "..." : eventos.length}
            route="/eventos"
          />
          <StatCard
            icon={HeartIcon}
            label="Doações disponíveis"
            value={loading ? "..." : doacoes.length}
            route="/doacoes"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-purple-800/40 pb-2">
          🐶 Pets em Destaque
        </h2>

        {loading ? (
          <p className="text-gray-400">Carregando pets...</p>
        ) : pets.length === 0 ? (
          <p className="text-gray-400">Nenhum pet cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pets.map((p) => (
              <CardPet key={p.id} pet={p} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-purple-800/40 pb-2">
          🎪 Próximos Eventos
        </h2>
        {eventos.length === 0 ? (
          <p className="text-gray-400">Nenhum evento disponível.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventos.map((e) => (
              <div
                key={e.id}
                className="bg-[#111] border border-gray-800 p-5 rounded-xl text-gray-300"
              >
                <h3 className="text-xl text-white font-semibold mb-2">{e.nome}</h3>
                <p>{e.descricao}</p>
                <p className="text-sm mt-2 text-gray-400">
                  📅 {e.data} • 📍 {e.local}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-purple-800/40 pb-2">
          🏡 Lares Temporários Recentes
        </h2>
        {lares.length === 0 ? (
          <p className="text-gray-400">Nenhum lar cadastrado ainda.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lares.map((l) => (
              <li
                key={l.id}
                className="bg-[#111] border border-gray-800 rounded-xl p-5"
              >
                <p className="text-white font-bold">{l.nomeVoluntario}</p>
                <p className="text-gray-400 text-sm">{l.localidade}</p>
                <p className="text-gray-400 text-sm">
                  Aceita: {l.aceita} • Capacidade: {l.capacidade}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-purple-800/40 pb-2">
          🧺 Últimas Doações
        </h2>
        {doacoes.length === 0 ? (
          <p className="text-gray-400">Nenhuma doação cadastrada.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doacoes.map((d) => (
              <li
                key={d.id}
                className="bg-[#111] border border-gray-800 rounded-xl p-5"
              >
                <p className="text-white font-bold">{d.tipo}</p>
                <p className="text-gray-400 text-sm">{d.descricao}</p>
                <p className="text-gray-500 text-xs mt-2">
                  {d.localidade} • {d.doador}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
