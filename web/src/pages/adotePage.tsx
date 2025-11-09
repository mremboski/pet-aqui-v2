
import React, { useEffect, useState } from 'react';
import PetCard from '../components/pet_card';
import Input from '../components/common/input';
import type { Pet } from '../types/pet_type';
import { filterPets } from '../services/petServices';

interface Filters { tipo: string; porte: string; cor: string; localidade: string; }

const FilterPanel: React.FC<{ filters: Filters, setFilters: (f: Filters) => void }> = ({ filters, setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => setFilters({ ...filters, [e.target.name]: e.target.value });
  return (
    <div className="p-4 bg-white/10 border border-white/10 rounded-xl shadow-lg sticky top-4">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Filtros de Busca</h3>

      <div className="mb-4">
        <label htmlFor="tipo" className="block text-sm font-medium text-gray-200">Tipo de Animal</label>
        <select name="tipo" id="tipo" value={filters.tipo} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 bg-black/30 text-gray-100 border border-white/10 rounded-md focus:outline-none focus:ring-secondary-light focus:border-secondary-light">
          <option value="">Todos</option><option value="Cachorro">Cachorro</option><option value="Gato">Gato</option><option value="Outros">Outros</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="porte" className="block text-sm font-medium text-gray-200">Porte</label>
        <select name="porte" id="porte" value={filters.porte} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 bg-black/30 text-gray-100 border border-white/10 rounded-md focus:outline-none focus:ring-secondary-light focus:border-secondary-light">
          <option value="">Qualquer</option><option value="Pequeno">Pequeno</option><option value="Médio">Médio</option><option value="Grande">Grande</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="cor" className="block text-sm font-medium text-gray-200">Cor Principal</label>
        <select id="cor" name="cor" value={filters.cor} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 bg-black/30 text-gray-100 border border-white/10 rounded-md focus:outline-none focus:ring-secondary-light focus:border-secondary-light">
          <option value="">Qualquer Cor</option><option value="Preto">Preto</option><option value="Branco">Branco</option><option value="Marrom">Marrom</option><option value="Caramelo">Caramelo</option><option value="Cinza">Cinza</option><option value="Tigrado">Tigrado</option><option value="Outra">Outra</option>
        </select>
      </div>

      <Input label="Localidade (Cidade/Estado)" id="localidade" name="localidade" type="text" placeholder="Ex: Porto Alegre" value={filters.localidade} onChange={handleChange} />
      <button onClick={() => setFilters({ tipo: '', porte: '', cor: '', localidade: '' })} className="w-full mt-2 py-2 text-sm bg-white/10 border border-white/10 text-gray-100 rounded-lg hover:bg_white/20 transition">Limpar Filtros</button>
    </div>
  );
};

export default function AdotePage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filters, setFilters] = useState<Filters>({ tipo: '', porte: '', cor: '', localidade: '' });

  async function fetchPets(current: Filters) {
    const apiFilters = {
      tipo: current.tipo || undefined,
      porte: current.porte || undefined,
      cor: current.cor || undefined,
      query: current.localidade || undefined
    };
    const list = await filterPets(apiFilters);
    setPets(list);
  }
  useEffect(() => { fetchPets(filters); }, [filters]);

  return (
    <div className="p-2 md:p-0">
      <h1 className="text-3xl font-bold text-white mb-6">Encontre o Pet Perfeito para Adoção</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4"><FilterPanel filters={filters} setFilters={setFilters} /></div>
        <main className="flex-1">
          <p className="mb-6 text-lg text-gray-300 font-semibold">{pets.length} {pets.length === 1 ? 'Pet encontrado' : 'Pets encontrados'}</p>
          {pets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map(pet => <PetCard key={pet.id} pet={pet} />)}
            </div>
          ) : (
            <div className="text-center py-10 bg-white/5 border border-white/10 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-200">Nenhum pet encontrado.</h2>
              <p className="text-gray-400 mt-2">Tente mudar seus critérios de filtro.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
