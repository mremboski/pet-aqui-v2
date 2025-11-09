import React, { useState } from "react";
import { cadastrarEvento } from "../context/eventServices";
import { useAuth } from "../context/AuthContext";

export default function CadastroEventoPage() {
    const { usuario } = useAuth();
    const [form, setForm] = useState({
        nome: "",
        data: "",
        horario: "",
        local: "",
        descricao: "",
        imagemUrl: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!usuario) {
            alert("⚠️ É necessário estar logado para cadastrar um evento.");
            return;
        }

        if (!form.imagemUrl.trim()) {
            alert("❌ A imagem do evento é obrigatória!");
            return;
        }

        try {
            await cadastrarEvento({
                nome: form.nome,
                data: form.data,
                horario: form.horario || undefined,
                local: form.local,
                descricao: form.descricao,
                imagemUrl: form.imagemUrl,
                criadoPor: usuario.nomeCompleto,
            });

            alert("✅ Evento cadastrado com sucesso!");
            setForm({ nome: "", data: "", horario: "", local: "", descricao: "", imagemUrl: "" });
        } catch (err) {
            console.error(err);
            alert("❌ Falha ao cadastrar evento.");
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white/10 border border-white/10 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-6">📅 Cadastrar Novo Evento</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nomeEvento" className="block text-sm font-semibold text-gray-300 mb-1">
                        Nome do Evento
                    </label>
                    <input
                        id="nomeEvento"
                        type="text"
                        name="nome"
                        placeholder="Nome do Evento"
                        value={form.nome}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="dataEvento" className="block text-sm font-semibold text-gray-300 mb-1">
                            Data do Evento *
                        </label>
                        <input
                            id="dataEvento"
                            type="date"
                            name="data"
                            value={form.data}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="horarioEvento" className="block text-sm font-semibold text-gray-300 mb-1">
                            Horário (opcional)
                        </label>
                        <input
                            id="horarioEvento"
                            type="time"
                            name="horario"
                            value={form.horario}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="localEvento" className="block text-sm font-semibold text-gray-300 mb-1">
                        Local do Evento *
                    </label>
                    <input
                        id="localEvento"
                        type="text"
                        name="local"
                        placeholder="Local do Evento"
                        value={form.local}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white"
                    />
                </div>

                <div>
                    <label htmlFor="descricaoEvento" className="block text-sm font-semibold text-gray-300 mb-1">
                        Descrição do Evento
                    </label>
                    <textarea
                        id="descricaoEvento"
                        name="descricao"
                        placeholder="Descrição do evento"
                        value={form.descricao}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white"
                    />
                </div>

                <div>
                    <label htmlFor="imagemUrl" className="block text-sm font-semibold text-gray-300 mb-1">
                        URL da Imagem do Evento
                    </label>
                    <input
                        id="imagemUrl"
                        type="url"
                        name="imagemUrl"
                        placeholder="URL da imagem do evento"
                        value={form.imagemUrl}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold rounded-lg transition"
                >
                    Cadastrar Evento
                </button>
            </form>
        </div>
    );
}
