import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const sucesso = await login(email, senha);
      if (sucesso) {
        navigate("/");
      } else {
        setErro("E-mail ou senha incorretos.");
      }
    } catch {
      setErro("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-xl shadow-lg border border-white/10 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>

        {erro && (
          <p className="text-red-400 text-center mb-4 font-medium">{erro}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500"
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="senha"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          Entrar
        </button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Ainda não tem conta?{" "}
          <a
            href="/cadastro-usuario"
            className="text-purple-400 hover:underline"
          >
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
