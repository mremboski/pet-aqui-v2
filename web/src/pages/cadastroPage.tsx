
import React, { useState } from 'react';
export default function CadastroPage(){
  const [formData, setFormData] = useState({ nomeCompleto:'', email:'', cpf:'', telefone:'', cidade:'', estado:'', sexo:'' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => setFormData(prev=>({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); alert('Cadastro realizado! (Simulado)'); console.log(formData); };
  const input = "w-full p-3 border border-white/10 rounded-lg bg-black/30 text-gray-100 focus:ring-primary focus:border-primary";
  const label = "block text-sm font-medium text-gray-200 mb-1";
  return (
    <div className="p-2 md:p-0">
      <h1 className="text-4xl font-extrabold text-white mb-6">Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-xl shadow-2xl border border-white/10 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-secondary border-b border-white/10 pb-2 mb-4">Seus Dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className={label} htmlFor="nomeCompleto">Nome Completo</label><input className={input} id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required/></div>
          <div><label className={label} htmlFor="cpf">CPF</label><input className={input} id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required placeholder="000.000.000-00"/></div>
          <div><label className={label} htmlFor="email">Email</label><input className={input} id="email" type="email" name="email" value={formData.email} onChange={handleChange} required/></div>
          <div><label className={label} htmlFor="telefone">Telefone</label><input className={input} id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(51) 99999-9999" required/></div>
        </div>
        <h2 className="text-2xl font-bold text-secondary border-b border-white/10 pb-2 pt-4 mb-4">Localização e Detalhes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div><label className={label} htmlFor="estado">Estado</label><input className={input} id="estado" name="estado" value={formData.estado} onChange={handleChange} placeholder="RS" required/></div>
          <div><label className={label} htmlFor="cidade">Cidade</label><input className={input} id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} required/></div>
          <div><label className={label} htmlFor="sexo">Sexo</label><select className={input} id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} required><option value="">Selecione</option><option value="F">Feminino</option><option value="M">Masculino</option><option value="O">Outro</option></select></div>
        </div>
        <button className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition">CADASTRAR MINHA CONTA</button>
      </form>
    </div>
  );
}
