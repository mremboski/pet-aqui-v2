
import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllPets } from '../services/petServices';
import type { Pet } from '../types/pet_type';

export default function PerfilPage(){
  const { userName } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  useEffect(()=>{ getAllPets().then(setPets); }, []);

  const meusInteresses = useMemo(()=> pets.filter(p => (p.interesses || []).includes(userName || '')), [pets, userName]);
  const minhasAvaliacoes = useMemo(()=> pets.flatMap(p => (p.avaliacoes || []).filter(a => a.usuario === userName).map(a => ({ ...a, petNome: p.nome }))), [pets, userName]);
  const meusPets = useMemo(()=> pets.filter(p => p.cidade === 'Porto Alegre' && p.estado === 'RS' && (p.interesses||[]).includes(userName || 'Ninguém?') === false ), [pets, userName]);

  return (
    <div className="p-2 md:p-0">
      <h1 className="text-4xl font-extrabold text-white mb-6">Perfil {userName ? `de ${userName}` : ''}</h1>
      {!userName && <p className="text-gray-300 mb-6">Você não está logado. Entre pela opção "Entrar" no topo.</p>}

      <section className="bg-white/10 p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Minhas avaliações</h2>
        {minhasAvaliacoes.length ? (
          <ul className="list-disc list-inside text-gray-200">{minhasAvaliacoes.map((a,i)=>(<li key={i}><strong>{a.petNome}</strong>: {a.nota} ★ — {a.comentario || 'sem comentário'}</li>))}</ul>
        ) : <p className="text-gray-300">Você ainda não avaliou nenhum pet.</p>}
      </section>

      <section className="bg-white/10 p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Meus interesses</h2>
        {meusInteresses.length ? (
          <ul className="list-disc list-inside text-gray-200">{meusInteresses.map(p=>(<li key={p.id}>{p.nome} — {p.cidade}/{p.estado}</li>))}</ul>
        ) : <p className="text-gray-300">Você ainda não demonstrou interesse.</p>}
      </section>
    </div>
  );
}
