
import React from 'react';
import { Pet } from '../types/pet_type';
import { Link } from 'react-router-dom';
import { mediaAvaliacoes } from '../services/petServices';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const fotoUrl = pet.fotoUrl || `https://via.placeholder.com/200/5BCEBF/FFFFFF?text=${encodeURIComponent(pet.nome)}`;
  const media = mediaAvaliacoes(pet);
  const interessados = pet.interesses?.length || 0;
  return (
    <Link to={`/adote/${pet.id}`} className="bg-white/10 p-4 rounded-xl shadow-lg border border-white/10 block hover:shadow-xl transition transform hover:scale-[1.01]">
      <img src={fotoUrl} alt={`Foto de ${pet.nome}`} className="w-full h-40 object-cover rounded-md mb-3" />
      <h3 className="text-xl font-bold text-white truncate">{pet.nome}</h3>
      <p className="text-sm text-gray-300"><span className="font-semibold">Tipo:</span> {pet.tipo} | <span className="font-semibold ml-2">Idade:</span> {pet.idade} anos</p>
      <p className="text-sm text-gray-300"><span className="font-semibold">Local:</span> {pet.cidade}, {pet.estado}</p>
      <div className="mt-2 flex items-center justify-between text-sm text-gray-200/90">
        <span className="flex items-center gap-1"><StarIcon className="h-4 w-4 text-yellow-400"/> {media ? `${media} ★` : 'Sem avaliações'}</span>
        <span className="flex items-center gap-1"><HeartIcon className="h-4 w-4 text-pink-500"/> {interessados} interessados</span>
      </div>
    </Link>
  );
};
export default PetCard;
