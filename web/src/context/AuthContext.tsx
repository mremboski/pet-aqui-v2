import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../services/api";

export type Usuario = {
  id: string;
  nomeCompleto: string;
  email: string;
  senha: string;
  role?: "user" | "admin";
};

type AuthContextType = {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  register: (dados: Omit<Usuario, "id">) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("petAquiUser");
    if (saved) {
      try {
        const parsed: Usuario = JSON.parse(saved);
        setUsuario(parsed);
      } catch (e) {
        console.error("Erro ao ler usuário salvo:", e);
        localStorage.removeItem("petAquiUser");
      }
    }
    setLoading(false);
  }, []);

  async function login(email: string, senha: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_URL}/usuarios?email=${email}`);
      if (!res.ok) throw new Error("Erro ao buscar usuário");

      const data: Usuario[] = await res.json();
      const user = data.find((u) => u.email === email && u.senha === senha);

      if (!user) {
        alert("❌ E-mail ou senha incorretos!");
        return false;
      }

      setUsuario(user);
      localStorage.setItem("petAquiUser", JSON.stringify(user));
      return true;
    } catch (err) {
      console.error("Erro no login:", err);
      alert("⚠️ Erro ao conectar-se ao servidor.");
      return false;
    }
  }

  async function register(dados: Omit<Usuario, "id">): Promise<boolean> {
    try {
      const check = await fetch(`${API_URL}/usuarios?email=${dados.email}`);
      const existentes = await check.json();
      if (existentes.length > 0) {
        alert("⚠️ Este e-mail já está cadastrado.");
        return false;
      }

      const novo: Usuario = {
        ...dados,
        id: crypto.randomUUID(),
        role: "user",
      };

      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar");

      alert("✅ Usuário cadastrado com sucesso!");
      return true;
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      alert("❌ Falha ao cadastrar. Verifique se o servidor (5174) está ativo.");
      return false;
    }
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("petAquiUser");
  }

  const isAuthenticated = !!usuario;

  return (
    <AuthContext.Provider
      value={{ usuario, isAuthenticated, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
