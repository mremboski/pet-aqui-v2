
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(){
  const [nome, setNome] = useState('Michel');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!nome.trim()) return; login(nome.trim()); navigate('/'); };
  return (
    <div className="p-2 md:p-0 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Entrar</h1>
      <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl border border-white/10">
        <label className="block text-sm font-semibold text-gray-200 mb-1" htmlFor="nome">Seu nome</label>
        <input id="nome" className="w-full p-3 border border-white/10 rounded-lg bg-black/30 text-gray-100" value={nome} onChange={e=>setNome(e.target.value)} placeholder="Digite um nome"/>
        <button className="mt-4 w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition">Entrar</button>
      </form>
    </div>
  );
}
