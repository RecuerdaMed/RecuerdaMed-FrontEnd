import React, { useState } from "react";
import { createDrug } from "../services/Services";
import Button from "../components/ui/Button";

export default function AddDrug({ onMedicationAdded }) {
  const [addDrug, setAddDrug] = useState(false);
  const [drugName, setDrugName] = useState("");
  const [description, setDescription] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequencyHours, setFrequencyHours] = useState("");
  const [nextIntakeTime, setNextIntakeTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => setAddDrug(true);
  const closeModal = () => setAddDrug(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!drugName || !dosage || !frequencyHours || !nextIntakeTime || !startDate) return;

    setLoading(true);

    try {
      // Estructura exacta para el backend Java
      const drugRequest = {
        drugName: drugName,
        description: description || "",
        dosage: dosage,
        frequencyHours: parseInt(frequencyHours),
        nextIntakeTime: nextIntakeTime, // HH:mm:ss format
        startDate: new Date(startDate).toISOString(),
        endDate: endDate ? new Date(endDate).toISOString() : null,
        active: true,
        activeReminder: true
      };

      const newDrug = await createDrug(drugRequest);
      console.log("Medicamento creado:", newDrug);

      if (onMedicationAdded) {
        onMedicationAdded(newDrug);
      }

      // Limpiar formulario
      setDrugName("");
      setDescription("");
      setDosage("");
      setFrequencyHours("");
      setNextIntakeTime("");
      setStartDate("");
      setEndDate("");
      closeModal();

    } catch (error) {
      console.error("Error creando medicamento:", error);
      alert("Error al crear el medicamento. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
                className="text-gray-700 font-bold px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
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
                  value={drugName}
                  onChange={(e) => setDrugName(e.target.value)}
                  disabled={loading}
                  required
                />
              </section>

              <section>
                <label className="block mb-1 font-medium">Descripción (opcional):</label>
                <textarea
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  rows="2"
                />
              </section>

              <section>
                <label className="block mb-1 font-medium">Dosis:</label>
                <input
                  type="text"
                  placeholder="ej: 500mg"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  disabled={loading}
                  required
                />
              </section>

              <section className="grid grid-cols-2 gap-4">
                <section>
                  <label className="block mb-1 font-medium">Hora de toma:</label>
                  <input
                    type="time"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={nextIntakeTime}
                    onChange={(e) => setNextIntakeTime(e.target.value)}
                    disabled={loading}
                    required
                  />
                </section>

                <section>
                  <label className="block mb-1 font-medium">Frecuencia (hrs):</label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={frequencyHours}
                    onChange={(e) => setFrequencyHours(e.target.value)}
                    disabled={loading}
                    required
                  />
                </section>
              </section>

              <section className="grid grid-cols-2 gap-4">
                <section>
                  <label className="block mb-1 font-medium">Fecha inicio:</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    disabled={loading}
                    required
                  />
                </section>

                <section>
                  <label className="block mb-1 font-medium">Fecha fin (opcional):</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={loading}
                  />
                </section>
              </section>

              <section className="flex justify-end gap-2 mt-6">
                <Button type="submit" disabled={loading}>
                  {loading ? "Guardando..." : "Agregar"}
                </Button>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="bg-gray-200 text-gray-700 px-4 py-1 rounded disabled:opacity-50"
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