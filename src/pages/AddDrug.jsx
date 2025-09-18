import React, { useState } from "react";
import Button from "../components/ui/Button";

export default function AddDrug({ addMedication }) {
  const [addDrug, setAddDrug] = useState(false);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [freq, setFreq] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const openModal = () => setAddDrug(true);
  const closeModal = () => setAddDrug(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !startTime || !freq || !startDate || !endDate) return;

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const nextDateTime = new Date(startDateTime.getTime() + Number(freq) * 60 * 60 * 1000);

    addMedication({
      id: Date.now(),
      title: name,
      time: startTime,
      startDate,
      endDate,
      frequency: freq,
      next: nextDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      nextDate: nextDateTime.toLocaleDateString("es-ES"),
      taken: false,
    });

    setName("");
    setStartTime("");
    setFreq("");
    setStartDate("");
    setEndDate("");
    closeModal();
  };

  return (
    <>
      <section className="flex justify-center mb-6">
        <Button onClick={openModal}>Añadir Medicamento</Button>
      </section>

      {addDrug && (
        <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <section className="bg-white rounded-lg shadow-2xl max-w-md w-[90%] p-6">
            <section className="flex justify-between items-center mb-4">
              <h2 className="m-0 text-xl font-semibold">Nuevo Medicamento</h2>
              <button
                onClick={closeModal}
                className="text-gray-700 font-bold px-2 py-1 rounded hover:bg-gray-200"
              >
                X
              </button>
            </section>

            <form className="space-y-4" onSubmit={handleAdd}>
              <section>
                <label className="block mb-1 font-medium">Nombre del Medicamento:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </section>

              <section className="grid grid-cols-4 gap-4">
                <section>
                  <label className="block mb-1 font-medium">Fecha inicio:</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </section>

                <section>
                  <label className="block mb-1 font-medium">Fecha fin:</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </section>

                <section>
                  <label className="block mb-1 font-medium">Hora inicio:</label>
                  <input
                    type="time"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </section>

                <section>
                  <label className="block mb-1 font-medium">Frecuencia (hrs):</label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={freq}
                    onChange={(e) => setFreq(e.target.value)}
                  />
                </section>
              </section>

              <section className="flex justify-end gap-2 mt-6">
                <Button type="submit">Agregar</Button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-200 text-gray-700 px-4 py-1 rounded"
                >
                  Cancelar
                </button>
              </section>
            </form>
          </section>
        </section>
      )}
    </>
  );
}
