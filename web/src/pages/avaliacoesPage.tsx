
import React, { useEffect, useState } from 'react';
import { getAllAvaliacoes } from '../services/petServices';

interface Row { petId:string; petNome:string; usuario:string; nota:number; comentario?:string; }

export default function AvaliacoesPage(){
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(()=>{ getAllAvaliacoes().then(setRows); }, []);
  return (
    <div className="p-2 md:p-0">
      <h1 className="text-3xl font-bold text-white mb-6">Avaliações Recentes</h1>
      {rows.length ? (
        <div className="space-y-3">
          {rows.map((r, i)=>(
            <div key={i} className="bg-white/10 p-4 rounded-lg border border-white/10">
              <div className="flex justify-between items-center">
                <p className="text-white font-semibold">{r.usuario} avaliou <span className="text-secondary">{r.petNome}</span> — <span className="font-bold">{r.nota} ★</span></p>
              </div>
              {r.comentario && <p className="text-gray-300 mt-1">{r.comentario}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">Ainda não há avaliações.</p>
      )}
    </div>
  );
}
