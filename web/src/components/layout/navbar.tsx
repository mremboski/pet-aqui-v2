import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../assets/petaqui.png";

export default function Navbar() {
  const { userName, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseLink =
    "px-4 py-2 text-sm font-medium rounded-lg transition duration-200";
  const inactive =
    "text-gray-300 hover:text-white hover:bg-purple-800/30 cursor-pointer";
  const active =
    "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)] cursor-pointer";

  const toggleDropdown = (menu: string) =>
    setActiveDropdown(activeDropdown === menu ? null : menu);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
        ? "backdrop-blur-xl bg-gradient-to-b from-black/80 to-black/60 shadow-[0_4px_25px_rgba(80,0,140,0.4)] border-b border-purple-700/40"
        : "backdrop-blur-md bg-black/50 border-b border-purple-700/30"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between h-16 items-center gap-6">
          <NavLink to="/" className="flex items-center select-none gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.5)] ring-2 ring-purple-600/40 group-hover:ring-purple-400/70 transition duration-300">
              <img
                src={logo}
                alt="Pet Aqui Logo"
                className="w-full h-full object-cover rounded-full scale-105 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-white font-bold text-lg tracking-wide group-hover:text-purple-300 transition">
              Pet <span className="text-purple-400">Aqui</span>
            </span>
          </NavLink>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => toggleDropdown("adocao")}
                className={`${baseLink} ${activeDropdown === "adocao" ? active : inactive
                  } flex items-center gap-1`}
              >
                Adoção <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "adocao" && (
                <div className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-lg border border-purple-800/40 rounded-lg shadow-lg py-2 w-56">
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
                    Cadastrar Animal
                  </NavLink>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("eventos")}
                className={`${baseLink} ${activeDropdown === "eventos" ? active : inactive
                  } flex items-center gap-1`}
              >
                Eventos <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "eventos" && (
                <div className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-lg border border-purple-800/40 rounded-lg shadow-lg py-2 w-56">
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
                className={`${baseLink} ${activeDropdown === "doacoes" ? active : inactive
                  } flex items-center gap-1`}
              >
                Doações <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "doacoes" && (
                <div className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-lg border border-purple-800/40 rounded-lg shadow-lg py-2 w-56">
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
                    Cadastro de Abrigo
                  </NavLink>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("apoio")}
                className={`${baseLink} ${activeDropdown === "apoio" ? active : inactive
                  } flex items-center gap-1`}
              >
                Apoio <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "apoio" && (
                <div className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-lg border border-purple-800/40 rounded-lg shadow-lg py-2 w-56">
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

            {userName && (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("perfil")}
                  className={`${baseLink} ${activeDropdown === "perfil" ? active : inactive
                    } flex items-center gap-1`}
                >
                  Perfil ({userName}) <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "perfil" && (
                  <div className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-lg border border-purple-800/40 rounded-lg shadow-lg py-2 w-52">
                    <NavLink
                      to="/perfil"
                      className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-700/40"
                    >
                      Meu Perfil
                    </NavLink>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-red-600 transition"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-purple-900/40 px-4 py-3 space-y-2">
          <NavLink
            to="/adote"
            onClick={() => setOpen(false)}
            className="block text-gray-300 hover:text-white hover:bg-purple-700/40 px-4 py-2 rounded-lg"
          >
            Adotar um Pet
          </NavLink>
          <NavLink
            to="/eventos"
            onClick={() => setOpen(false)}
            className="block text-gray-300 hover:text-white hover:bg-purple-700/40 px-4 py-2 rounded-lg"
          >
            Eventos
          </NavLink>
          <NavLink
            to="/doacao-itens"
            onClick={() => setOpen(false)}
            className="block text-gray-300 hover:text-white hover:bg-purple-700/40 px-4 py-2 rounded-lg"
          >
            Doação de Itens
          </NavLink>
          <NavLink
            to="/lar-temporario"
            onClick={() => setOpen(false)}
            className="block text-gray-300 hover:text-white hover:bg-purple-700/40 px-4 py-2 rounded-lg"
          >
            Cadastro de Abrigo
          </NavLink>

          {userName && (
            <>
              <NavLink
                to="/perfil"
                onClick={() => setOpen(false)}
                className="block text-gray-300 hover:text-white hover:bg-purple-700/40 px-4 py-2 rounded-lg"
              >
                Meu Perfil
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
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
