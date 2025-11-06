import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./pages/homePage";
import AdotePage from "./pages/adotePage";
import EventosPage from "./pages/eventosPage";
import CadastroDoacaoPetPage from "./pages/cadastroDoacaoPetPage";
import DoacaoItensPage from "./pages/doacaoItensPage";
import LarTemporarioPage from "./pages/larTemporarioPage";
import DenunciaPage from "./pages/denunciaPage";
import AvaliacoesPage from "./pages/avaliacoesPage";
import CadastroPage from "./pages/cadastroPage";
import PerfilPage from "./pages/perfilPage";
import PetProfilePage from "./pages/petProfilePage";
import CadastroEventoPage from "./pages/cadastroEventoPage";
import PrivateRoute from "./context/privateRoute";

export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0b0f19] to-black text-gray-100 overflow-x-hidden">
      <SplashScreen />

      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16 relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adote" element={<AdotePage />} />
          <Route
            path="/cadastro-doacao-pet"
            element={<CadastroDoacaoPetPage />}
          />
          <Route path="/eventos" element={<EventosPage />} />
          <Route
            path="/cadastro-evento"
            element={
              <PrivateRoute>
                <CadastroEventoPage />
              </PrivateRoute>
            }
          />
          <Route path="/doacao-itens" element={<DoacaoItensPage />} />
          <Route path="/lar-temporario" element={<LarTemporarioPage />} />
          <Route path="/denuncia" element={<DenunciaPage />} />
          <Route path="/avaliacoes" element={<AvaliacoesPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/cadastro-usuario" element={<CadastroPage />} />
          <Route path="/adote/:petId" element={<PetProfilePage />} />
          <Route
            path="*"
            element={
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-500">
                  404 - Página Não Encontrada
                </h1>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
