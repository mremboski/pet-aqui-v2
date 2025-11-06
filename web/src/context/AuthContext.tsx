
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthCtx {
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
}
const Ctx = createContext<AuthCtx>({ userName: null, login: () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [userName, setUserName] = useState<string | null>(null);
  useEffect(()=>{ setUserName(localStorage.getItem('userName')); }, []);
  const login = (name: string) => { localStorage.setItem('userName', name); setUserName(name); };
  const logout = () => { localStorage.removeItem('userName'); setUserName(null); };
  return <Ctx.Provider value={{ userName, login, logout }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
