import React, { useState } from "react";

const CadastroEventoPage: React.FC = () => {
    const [formData, setFormData] = useState({
        nomeEvento: "",
        data: "",
        horario: "",
        local: "",
        descricao: "",
        fotoLink: "",
        fotoArquivo: null as File | null,
    });

    const [fotoPreview, setFotoPreview] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, fotoArquivo: file }));
            const reader = new FileReader();
            reader.onloadend = () => setFotoPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.nomeEvento ||
            !formData.data ||
            !formData.horario ||
            !formData.local
        ) {
            alert("Preencha todos os campos obrigatórios antes de enviar.");
            return;
        }

        alert(`Evento "${formData.nomeEvento}" cadastrado com sucesso! (Simulado)`);

        setFormData({
            nomeEvento: "",
            data: "",
            horario: "",
            local: "",
            descricao: "",
            fotoLink: "",
            fotoArquivo: null,
        });
        setFotoPreview(null);
    };

    return (
        <div className="p-8 flex flex-col items-center min-h-screen">
            <h1 className="text-3xl font-extrabold text-white mb-10">
                🎪 Cadastrar Evento de Adoção
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-[#111] border border-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-3xl space-y-6"
            >

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                        Nome do Evento
                    </label>
                    <input
                        type="text"
                        name="nomeEvento"
                        value={formData.nomeEvento}
                        onChange={handleChange}
                        placeholder="Ex: Feira de Adoção da Capital"
                        className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-1">
                            Data
                        </label>
                        <input
                            type="date"
                            name="data"
                            value={formData.data}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-1">
                            Horário
                        </label>
                        <input
                            type="time"
                            name="horario"
                            value={formData.horario}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                        Local do Evento
                    </label>
                    <input
                        type="text"
                        name="local"
                        value={formData.local}
                        onChange={handleChange}
                        placeholder="Ex: Parque da Redenção - Porto Alegre/RS"
                        className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                        Descrição
                    </label>
                    <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Conte detalhes sobre o evento, número de pets, instituições participantes..."
                        rows={4}
                        className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                        Link da Foto (obrigatório)
                    </label>
                    <input
                        type="url"
                        name="fotoLink"
                        value={formData.fotoLink}
                        onChange={handleChange}
                        placeholder="https://exemplo.com/imagem.jpg"
                        className="w-full p-3 border border-gray-700 bg-[#1a1a1a] text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                        Upload de Imagem (opcional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full text-sm text-gray-400"
                    />
                </div>

                {fotoPreview && (
                    <div className="mt-4 flex justify-center">
                        <img
                            src={fotoPreview}
                            alt="Prévia do evento"
                            className="w-48 h-48 object-cover rounded-lg border border-gray-700 shadow-md"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
                >
                    Cadastrar Evento
                </button>
            </form>
        </div>
    );
};

export default CadastroEventoPage;
