import React, { useState } from "react";
import Input from "../components/common/input";

export default function DenunciaPage() {
  const [formData, setFormData] = useState({
    nome: "",
    contato: "",
    local: "",
    tipoDenuncia: "",
    descricao: "",
    anonimo: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Denúncia registrada com sucesso! (Simulado)");
    console.log("Dados enviados:", formData);
    setFormData({
      nome: "",
      contato: "",
      local: "",
      tipoDenuncia: "",
      descricao: "",
      anonimo: false,
    });
  };

  return (
    <div className="p-8 flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-extrabold text-white mb-10 text-center">
        ⚠️ Denúncia de Maus-Tratos ou Abandono
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111] border border-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-3xl space-y-6"
      >
        <p className="text-gray-300 text-center mb-6">
          Sua denúncia é muito importante para combater o abandono e maus-tratos.
          As informações enviadas serão tratadas com confidencialidade.
        </p>

        <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mb-4">
          Seus Dados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nome Completo"
            id="nome"
            name="nome"
            type="text"
            placeholder="Seu nome (opcional)"
            value={formData.nome}
            onChange={handleChange}
          />

          <Input
            label="Telefone ou Email para Contato"
            id="contato"
            name="contato"
            type="text"
            placeholder="(XX) XXXXX-XXXX ou email@exemplo.com"
            value={formData.contato}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="anonimo"
            name="anonimo"
            checked={formData.anonimo}
            onChange={handleChange}
            className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-700 bg-[#1a1a1a] rounded"
          />
          <label htmlFor="anonimo" className="ml-2 text-gray-300 text-sm">
            Enviar denúncia anonimamente
          </label>
        </div>

        <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mt-8 mb-4">
          Local do Ocorrido
        </h2>

        <Input
          label="Endereço ou Localização Aproximada"
          id="local"
          name="local"
          type="text"
          placeholder="Ex: Rua das Flores, nº 100 - Bairro Centro, Porto Alegre"
          value={formData.local}
          onChange={handleChange}
          required
        />

        <div>
          <label
            htmlFor="tipoDenuncia"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Tipo de Denúncia
          </label>
          <select
            id="tipoDenuncia"
            name="tipoDenuncia"
            value={formData.tipoDenuncia}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="">Selecione</option>
            <option value="Maus-tratos">Maus-tratos</option>
            <option value="Abandono">Abandono</option>
            <option value="Negligência">Negligência</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="descricao"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Descrição dos Fatos
          </label>
          <textarea
            id="descricao"
            name="descricao"
            rows={4}
            placeholder="Descreva o que aconteceu, incluindo o máximo de detalhes..."
            value={formData.descricao}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
        >
          Enviar Denúncia
        </button>
      </form>
    </div>
  );
}
