
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addAvaliacao, addInteresse, getPetById, mediaAvaliacoes } from '../services/petServices';
import type { Pet } from '../types/pet_type';
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';

export default function PetProfilePage(){
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const { userName } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');

  useEffect(()=>{
    if (!petId) { setLoading(false); navigate('/404'); return; }
    (async ()=>{
      const found = await getPetById(petId);
      if (found) setPet(found); else navigate('/404');
      setLoading(false);
    })();
  }, [petId, navigate]);

  const media = useMemo(()=> pet ? mediaAvaliacoes(pet) : 0, [pet]);

  if (loading) return <div className="p-8 text-center text-xl text-white">Carregando...</div>;
  if (!pet) return <div className="p-8 text-center"><h1 className="text-3xl font-bold text-red-400">Pet Não Encontrado!</h1></div>;

  const handleInteresse = async () => {
    if (!userName) { alert('Entre para demonstrar interesse.'); return; }
    await addInteresse(pet.id, userName);
    alert('Interesse registrado!');
    const refreshed = await getPetById(pet.id);
    setPet(refreshed || pet);
  };

  const handleAvaliar = async () => {
    if (!userName) { alert('Entre para avaliar.'); return; }
    await addAvaliacao(pet.id, { usuario: userName, nota, comentario });
    alert('Avaliação enviada!');
    setComentario(''); setNota(5);
    const refreshed = await getPetById(pet.id);
    setPet(refreshed || pet);
  };

  return (
    <div className="p-2 md:p-0 max-w-6xl mx-auto">
      <div className="bg-white/10 p-6 rounded-xl shadow-2xl border border-white/10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            {pet.fotoUrl ? (<img src={pet.fotoUrl} alt={pet.nome} className="w-full h-96 object-cover rounded-lg shadow-lg border-4 border-primary/50"/>) :
              (<div className="w-full h-96 flex items-center justify-center bg-white/10 text-gray-300 rounded-lg shadow-lg border-4 border-white/10">Sem Foto</div>)}
          </div>
          <div className="lg:w-2/3">
            <h1 className="text-5xl font-extrabold text-white mb-2">{pet.nome}</h1>
            <p className="text-2xl text-gray-200 font-medium">{pet.raca} | {pet.tipo}</p>
            <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <Stat label="Idade" value={`${pet.idade} anos`} />
              <Stat label="Porte" value={pet.porte} />
              <Stat label="Cor" value={pet.cor} />
              <Stat label="Localização" value={`${pet.cidade}, ${pet.estado}`} />
              <Stat label="Média" value={`${media || 0} ★`} />
              <Stat label="Interessados" value={`${(pet.interesses || []).length}`} />
            </div>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">Sobre {pet.nome}</h2>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{pet.descricao}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={handleInteresse} className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"><HeartIcon className="h-5 w-5"/> Tenho Interesse</button>
            </div>

            <div className="mt-8 bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-white mb-2">Avaliar {pet.nome}</h3>
              <div className="flex items-center gap-3">
                <label className="text-gray-200">Nota:</label>
                <select value={nota} onChange={e => setNota(parseInt(e.target.value))} className="bg-black/30 text-gray-100 border border-white/10 rounded px-2 py-1">
                  {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n} ★</option>)}
                </select>
              </div>
              <textarea value={comentario} onChange={e=>setComentario(e.target.value)} className="w-full mt-3 bg-black/30 text-gray-100 border border-white/10 rounded p-2" placeholder="Comentário (opcional)"/>
              <button onClick={handleAvaliar} className="mt-3 flex items-center gap-2 px-4 py-2 bg-secondary text-black rounded-lg hover:bg-secondary/80"><StarIcon className="h-5 w-5"/> Enviar avaliação</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Stat({label,value}:{label:string; value:string}){
  return (<div className="border-b border-white/10 pb-2"><p className="text-sm font-semibold text-gray-300">{label}</p><p className="text-lg font-bold text-white">{value}</p></div>);
}
