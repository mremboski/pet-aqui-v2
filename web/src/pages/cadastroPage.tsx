import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CadastroPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (senha !== confirmar) {
      alert("❌ As senhas não conferem!");
      return;
    }

    const sucesso = await register({ nomeCompleto, email, senha });
    if (sucesso) navigate("/login");
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-xl shadow-lg border border-white/10 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Criar Conta
        </h1>

        <div className="mb-4">
          <label htmlFor="nomeCompleto" className="block text-sm text-gray-300 mb-1">
            Nome Completo
          </label>
          <input
            id="nomeCompleto"
            type="text"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-gray-100 focus:border-purple-500"
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-gray-100 focus:border-purple-500"
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="senha" className="block text-sm text-gray-300 mb-1">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-gray-100 focus:border-purple-500"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmar" className="block text-sm text-gray-300 mb-1">
            Confirmar Senha
          </label>
          <input
            id="confirmar"
            type="password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-gray-100 focus:border-purple-500"
            placeholder="Confirme sua senha"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
