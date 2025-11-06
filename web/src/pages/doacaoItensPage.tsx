import React, { useState } from "react";
import Input from "../components/common/input";

export default function DoacaoItensPage() {
  const [formData, setFormData] = useState({
    nomeDoador: "",
    contato: "",
    localidade: "",
    itemTipo: "",
    itemQuantidade: "",
    descricaoDetalhes: "",
    preferenciaColeta: "Coleta na Residência",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Oferta de doação registrada com sucesso! (Simulado)");
    console.log(formData);
    setFormData({
      nomeDoador: "",
      contato: "",
      localidade: "",
      itemTipo: "",
      itemQuantidade: "",
      descricaoDetalhes: "",
      preferenciaColeta: "Coleta na Residência",
    });
  };

  return (
    <div className="p-8 flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-extrabold text-white mb-10 text-center">
        🎁 Doação de Itens (Ração, Casinhas e Mais)
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111] border border-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-3xl space-y-6"
      >
        <p className="text-gray-300 text-center mb-6">
          Seu apoio é fundamental. Informe abaixo os itens que deseja doar.
        </p>

        <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mb-4">
          Seus Dados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Seu Nome Completo"
            id="nomeDoador"
            name="nomeDoador"
            type="text"
            placeholder="Seu nome"
            value={formData.nomeDoador}
            onChange={handleChange}
            required
          />

          <Input
            label="Telefone ou Email para Contato"
            id="contato"
            name="contato"
            type="text"
            placeholder="(XX) XXXXX-XXXX"
            value={formData.contato}
            onChange={handleChange}
            required
          />

          <Input
            label="Localidade (Cidade/Estado)"
            id="localidade"
            name="localidade"
            type="text"
            placeholder="Ex: Curitiba - PR"
            value={formData.localidade}
            onChange={handleChange}
            required
          />
        </div>

        <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mt-8 mb-4">
          Detalhes da Doação
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label
              htmlFor="itemTipo"
              className="block text-sm font-semibold text-gray-300 mb-1"
            >
              Tipo de Item
            </label>
            <select
              id="itemTipo"
              name="itemTipo"
              value={formData.itemTipo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="">Selecione o Item</option>
              <option value="Ração">Ração</option>
              <option value="Casinha/Cama">Casinha/Cama</option>
              <option value="Medicamentos">Medicamentos</option>
              <option value="Brinquedos">Brinquedos/Coleiras</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <Input
            label="Quantidade / Peso (Ex: 5kg, 2 unid.)"
            id="itemQuantidade"
            name="itemQuantidade"
            type="text"
            placeholder="Ex: 10kg de ração, 1 casinha"
            value={formData.itemQuantidade}
            onChange={handleChange}
            required
          />

          <div>
            <label
              htmlFor="preferenciaColeta"
              className="block text-sm font-semibold text-gray-300 mb-1"
            >
              Como você prefere doar?
            </label>
            <select
              id="preferenciaColeta"
              name="preferenciaColeta"
              value={formData.preferenciaColeta}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="Coleta na Residência">
                Solicitar Coleta na Residência
              </option>
              <option value="Entrega no Abrigo">
                Entregar em Abrigo Parceiro
              </option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="descricaoDetalhes"
              className="block text-sm font-semibold text-gray-300 mb-1"
            >
              Detalhes e Condição dos Itens
            </label>
            <textarea
              id="descricaoDetalhes"
              name="descricaoDetalhes"
              rows={4}
              placeholder="A ração está fechada? A casinha está em bom estado?"
              value={formData.descricaoDetalhes}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
        >
          Oferecer Doação
        </button>
      </form>
    </div>
  );
}
