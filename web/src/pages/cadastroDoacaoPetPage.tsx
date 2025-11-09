import React, { useState } from "react";
import { cadastrarPet } from "../services/petServices";
import { Pet } from "../types/pet_type";
import Input from "../components/common/input";

type PetFormData = Omit<Pet, "id" | "fotoUrl" | "interesses" | "avaliacoes">;

const initialFormState: PetFormData = {
  nome: "",
  idade: 1,
  cor: "Outra",
  raca: "",
  tipo: "Cachorro",
  porte: "Médio",
  descricao: "",
  cidade: "",
  estado: "",
  saude: "",
  temperamento: "",
};

export default function CadastroDoacaoPetPage() {
  const [formData, setFormData] = useState<PetFormData>(initialFormState);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoLink, setFotoLink] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "idade" ? (value === "" ? 0 : parseInt(value) || 0) : value,
    }));
  };

  async function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const handleFotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await fileToDataURL(file);
      setFotoPreview(dataUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalFoto = fotoLink || fotoPreview;
    if (!formData.nome || !formData.cidade || !formData.descricao) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await cadastrarPet({ ...formData, fotoUrl: finalFoto || "" });
      alert(`${formData.nome} cadastrado com sucesso!`);
      setFormData(initialFormState);
      setFotoPreview(null);
      setFotoLink("");
    } catch (error) {
      alert("Erro ao cadastrar. Veja o console.");
      console.error(error);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-extrabold text-white mb-10">
        🐾 Cadastro de Pet para Doação
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111] border border-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-3xl space-y-6"
      >

        <Input
          id="nome"
          name="nome"
          type="text"
          label="Nome do Pet"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <Input
          id="raca"
          name="raca"
          type="text"
          label="Raça"
          value={formData.raca}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tipo" className="block text-sm font-semibold text-gray-300 mb-1">
              Tipo de Animal *
            </label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div>
            <label htmlFor="porte" className="block text-sm font-semibold text-gray-300 mb-1">
              Porte *
            </label>
            <select
              id="porte"
              name="porte"
              value={formData.porte}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <Input
            id="idade"
            name="idade"
            type="number"
            label="Idade (anos) *"
            value={formData.idade.toString()}
            onChange={handleChange}
            min="0"
            max="30"
            required
          />

          <div>
            <label htmlFor="cor" className="block text-sm font-semibold text-gray-300 mb-1">
              Cor Principal *
            </label>
            <select
              id="cor"
              name="cor"
              value={formData.cor}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="Preto">Preto</option>
              <option value="Branco">Branco</option>
              <option value="Marrom">Marrom</option>
              <option value="Caramelo">Caramelo</option>
              <option value="Cinza">Cinza</option>
              <option value="Tigrado">Tigrado</option>
              <option value="Outra">Outra</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="cidade"
            name="cidade"
            type="text"
            label="Cidade *"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
          <Input
            id="estado"
            name="estado"
            type="text"
            label="Estado *"
            value={formData.estado}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="descricao" className="block text-sm font-semibold text-gray-300 mb-1">
            Descrição *
          </label>
          <textarea
            id="descricao"
            name="descricao"
            rows={4}
            value={formData.descricao}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            placeholder="Conte um pouco sobre o pet..."
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="saude" className="block text-sm font-semibold text-gray-300 mb-1">
            Saúde (opcional)
          </label>
          <textarea
            id="saude"
            name="saude"
            rows={2}
            value={formData.saude || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            placeholder="Condições de saúde, vacinas, etc."
          ></textarea>
        </div>

        <div>
          <label htmlFor="temperamento" className="block text-sm font-semibold text-gray-300 mb-1">
            Temperamento (opcional)
          </label>
          <textarea
            id="temperamento"
            name="temperamento"
            rows={2}
            value={formData.temperamento || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            placeholder="Personalidade, comportamento, etc."
          ></textarea>
        </div>

        <Input
          id="fotoLink"
          name="fotoLink"
          type="url"
          label="Link da Foto (opcional)"
          placeholder="https://exemplo.com/foto.jpg"
          value={fotoLink}
          onChange={(e) => setFotoLink(e.target.value)}
        />

        <div>
          <label htmlFor="fotoUpload" className="block text-sm font-semibold text-gray-300 mb-1">
            Upload de Imagem (opcional)
          </label>
          <input
            id="fotoUpload"
            type="file"
            accept="image/*"
            onChange={handleFotoUpload}
            className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            title="Selecione uma imagem do pet"
          />
        </div>

        {fotoPreview || fotoLink ? (
          <div className="mt-4 flex justify-center">
            <img
              src={fotoLink || fotoPreview!}
              alt="Prévia do Pet"
              className="w-48 h-48 object-cover rounded-lg border border-gray-700 shadow-md"
            />
          </div>
        ) : null}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
        >
          Cadastrar Pet
        </button>
      </form>
    </div>
  );
}
