import React, { useState } from "react";
import Input from "../components/common/input";
import { cadastrarLar } from "../services/laresServices";

const Select: React.FC<any> = ({ label, id, children, ...props }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-gray-300 mb-1"
    >
      {label}
    </label>
    <select
      id={id}
      name={id}
      className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
      {...props}
    >
      {children}
    </select>
  </div>
);

export default function LarTemporarioPage() {
  const [formData, setFormData] = useState({
    nomeVoluntario: "",
    telefone: "",
    email: "",
    capacidadePets: "1",
    tipoPetsAceitos: "Cachorros e Gatos",
    experiencia: "",
    localidade: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nomeVoluntario || !formData.telefone || !formData.localidade) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await cadastrarLar({
        nomeVoluntario: formData.nomeVoluntario,
        telefone: formData.telefone,
        email: formData.email,
        localidade: formData.localidade,
        capacidade: formData.capacidadePets,
        aceita: formData.tipoPetsAceitos,
        experiencia: formData.experiencia,
      });

      alert("✅ Cadastro de Lar Temporário realizado com sucesso!");
      setFormData({
        nomeVoluntario: "",
        telefone: "",
        email: "",
        capacidadePets: "1",
        tipoPetsAceitos: "Cachorros e Gatos",
        experiencia: "",
        localidade: "",
      });
    } catch (err) {
      console.error("Erro ao cadastrar lar:", err);
      alert("❌ Falha ao cadastrar lar temporário. Verifique o console.");
    }
  };

  return (
    <div className="p-8 flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-extrabold text-white mb-10 text-center">
        🏠 Cadastrar-se como Lar Temporário
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111] border border-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-3xl space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Seu Nome Completo"
            id="nomeVoluntario"
            name="nomeVoluntario"
            type="text"
            placeholder="Seu nome"
            value={formData.nomeVoluntario}
            onChange={handleChange}
            required
          />

          <Input
            label="Telefone (WhatsApp)"
            id="telefone"
            name="telefone"
            type="tel"
            placeholder="(XX) XXXXX-XXXX"
            value={formData.telefone}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="seuemail@exemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Localidade (Cidade/Estado)"
            id="localidade"
            name="localidade"
            type="text"
            placeholder="Ex: Porto Alegre - RS"
            value={formData.localidade}
            onChange={handleChange}
            required
          />

          <Select
            label="Capacidade Máxima de Pets"
            id="capacidadePets"
            value={formData.capacidadePets}
            onChange={handleChange}
            required
          >
            <option value="1">1 Pet</option>
            <option value="2">2 Pets</option>
            <option value="3+">3 ou mais Pets</option>
          </Select>

          <Select
            label="Quais tipos você aceita?"
            id="tipoPetsAceitos"
            value={formData.tipoPetsAceitos}
            onChange={handleChange}
            required
          >
            <option value="Cachorros e Gatos">Cachorros e Gatos</option>
            <option value="Apenas Cachorros">Apenas Cachorros</option>
            <option value="Apenas Gatos">Apenas Gatos</option>
            <option value="Outros">Outros (ex: aves, roedores)</option>
          </Select>
        </div>

        <div>
          <label
            htmlFor="experiencia"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Experiência com Animais e Observações
          </label>
          <textarea
            id="experiencia"
            name="experiencia"
            rows={4}
            placeholder="Você tem outros pets? Qual sua experiência com resgates ou lares temporários?"
            value={formData.experiencia}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
        >
          Enviar Cadastro de Lar Temporário
        </button>
      </form>
    </div>
  );
}
