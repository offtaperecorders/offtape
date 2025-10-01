import React, { useState } from "react";
import { bookStudio } from "../services/firebase";

const studios = [
  "Studio 1",
  "Studio 2",
  "Studio 3",
  "Studio 4",
  "Studio 5",
  "Sala de Ensaio",
  "Sala de Gravação"
];

export default function BookingForm({ user }) {
  const [date, setDate] = useState("");
  const [studio, setStudio] = useState(studios[0]);
  const [service, setService] = useState("Gravação"); // só exemplo
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await bookStudio(user, date, studio, service);
      setMessage("Agendamento confirmado com sucesso!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Agendar Estúdio</h2>

      <label className="block mb-2">Data e Hora</label>
      <input
        type="datetime-local"
        className="border p-2 mb-4 w-full rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label className="block mb-2">Escolha o Estúdio / Sala</label>
      <select
        value={studio}
        onChange={(e) => setStudio(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      >
        {studios.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Você pode expandir para escolher tipo de serviço aqui */}
      <label className="block mb-2">Tipo de Serviço</label>
      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      >
        <option value="Gravação">Gravação</option>
        <option value="Ensaio">Ensaio</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Agendar
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
}
