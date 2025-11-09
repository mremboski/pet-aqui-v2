import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logotransp.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) =>
    setActiveDropdown(activeDropdown === menu ? null : menu);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-purple-700/30 transition-all duration-500`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2 select-none">
            <img
              src={logo}
              alt="Pet Aqui"
              className="w-10 h-10 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)] hover:scale-105 transition-transform duration-300"
            />
            <span className="text-white font-bold text-lg tracking-wide">
              Pet <span className="text-purple-400">Aqui</span>
            </span>
          </NavLink>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => toggleDropdown("adocao")}
                className="text-gray-300 hover:text-white flex items-center gap-1"
              >
                Adoção <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "adocao" && (
                <div className="absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-xl border border-purple-800/40 rounded-lg shadow-lg py-2 w-56">
                  <NavLink
                    to="/adote"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                  >
                    Adotar um Pet
                  </NavLink>
                  <NavLink
                    to="/cadastro-doacao-pet"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                  >
                    Cadastrar Pet
                  </NavLink>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("eventos")}
                className="text-gray-300 hover:text-white flex items-center gap-1"
              >
                Eventos <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "eventos" && (
                <div className="absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-xl border border-purple-800/40 rounded-lg shadow-lg py-2 w-56">
                  <NavLink
                    to="/eventos"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                  >
                    Ver Eventos
                  </NavLink>
                  <NavLink
                    to="/cadastro-evento"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                  >
                    Cadastrar Evento
                  </NavLink>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("doacoes")}
                className="text-gray-300 hover:text-white flex items-center gap-1"
              >
                Doações <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "doacoes" && (
                <div className="absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-xl border border-purple-800/40 rounded-lg shadow-lg py-2 w-56">
                  <NavLink
                    to="/doacao-itens"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                  >
                    Doação de Itens
                  </NavLink>
                  <NavLink
                    to="/lar-temporario"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                  >
                    Cadastro de Lar Temporário
                  </NavLink>
                  <NavLink
                    to="/doacoes"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                  >
                    Ver Doações
                  </NavLink>
                  <NavLink
                    to="/lares"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                  >
                    Ver Lares
                  </NavLink>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("apoio")}
                className="text-gray-300 hover:text-white flex items-center gap-1"
              >
                Apoio <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "apoio" && (
                <div className="absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-xl border border-purple-800/40 rounded-lg shadow-lg py-2 w-56">
                  <NavLink
                    to="/denuncia"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                  >
                    Denúncia
                  </NavLink>
                  <NavLink
                    to="/avaliacoes"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                  >
                    Avaliações
                  </NavLink>
                </div>
              )}
            </div>

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition"
                >
                  Entrar
                </NavLink>
                <NavLink
                  to="/cadastro-usuario"
                  className="px-4 py-2 border border-purple-500 text-purple-300 rounded-lg font-semibold hover:bg-purple-800/40 transition"
                >
                  Cadastrar-se
                </NavLink>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">
                  👋 Olá, <strong>{user.nomeCompleto.split(" ")[0]}</strong>
                </span>

                {user.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className="px-3 py-1 bg-white/10 border border-purple-600/50 text-purple-300 rounded-lg text-sm hover:bg-white/15 transition"
                  >
                    Painel
                  </NavLink>
                )}

                <button
                  onClick={logout}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition"
                >
                  Sair
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/90 border-t border-purple-800/40 px-4 py-3 space-y-3">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white">
            Início
          </NavLink>
          <NavLink to="/adote" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white">
            Adoção
          </NavLink>
          <NavLink to="/eventos" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white">
            Eventos
          </NavLink>
          <NavLink to="/doacoes" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white">
            Doações
          </NavLink>
          <NavLink to="/lares" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white">
            Lares Temporários
          </NavLink>
          <NavLink to="/denuncia" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white">
            Denúncia
          </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-center bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                Entrar
              </NavLink>
              <NavLink
                to="/cadastro-usuario"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-center border border-purple-500 text-purple-300 rounded-lg font-semibold hover:bg-purple-800/40 transition"
              >
                Cadastrar-se
              </NavLink>
            </>
          ) : (
            <>
              <div className="text-gray-300 text-sm">
                👋 Olá, {user.nomeCompleto.split(" ")[0]}
              </div>

              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2 text-purple-300 bg-white/10 border border-purple-600/40 rounded-lg font-semibold hover:bg-white/15 transition"
                >
                  Painel Admin
                </NavLink>
              )}

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Sair
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
