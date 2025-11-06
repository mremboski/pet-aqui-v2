
import React from 'react';
interface Evento { id:number; nome:string; data:string; horario:string; local:string; descricao:string; tipo:'Feira de Adoção'|'Arrecadação'|'Mutirão'; }
const mockEventos: Evento[] = [
  { id:1, nome:'Feira de Adoção da Capital', data:'20/12/2025', horario:'10:00 - 16:00', local:'Parque da Redenção, Porto Alegre - RS', descricao:'Mais de 50 cães e gatos.', tipo:'Feira de Adoção' },
  { id:2, nome:'Campanha de Ração em Canoas', data:'05/01/2026', horario:'09:00 - 12:00', local:'Supermercado Central, Canoas - RS', descricao:'Arrecadação de ração e cobertores.', tipo:'Arrecadação' },
];
export default function EventosPage(){
  const getBorder = (t:string)=> t==='Feira de Adoção' ? 'border-l-secondary' : 'border-l-primary';
  const getText = (t:string)=> t==='Feira de Adoção' ? 'text-secondary' : 'text-primary';
  return (
    <div className="p-2 md:p-0">
      <h1 className="text-3xl font-bold text_white mb-6">Próximos Eventos e Feiras de Adoção</h1>
      <div className="space-y-6">
        {mockEventos.map(e => (
          <div key={e.id} className={`bg-white/10 p-6 rounded-xl shadow-lg border border_white/10 hover:shadow-xl transition duration-300 border-l-8 ${getBorder(e.tipo)}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-2xl font-bold text_white">{e.nome}</h2>
                <p className={`text-sm font-semibold mt-1 ${getText(e.tipo)}`}>{e.tipo}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-100">{e.data}</p>
                <p className="text-sm text-gray-300">{e.horario}</p>
              </div>
            </div>
            <p className="text-gray-200 mb-4">{e.descricao}</p>
            <div className="border-t border_white/10 pt-3 flex justify-between items-center">
              <p className="text-sm font-medium text-gray-200">Local: <span className="font-bold">{e.local}</span></p>
              <button className="px-4 py-2 bg-primary text_white rounded-lg text-sm hover:bg-secondary transition">Ver Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
