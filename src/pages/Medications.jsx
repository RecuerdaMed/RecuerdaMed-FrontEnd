import { useState } from "react";
import DrugList from "../components/medication/DrugList";
import DrugForm from "../components/medication/DrugForm";
import { updateDrug } from "../services/Services";

export default function Medications() {
  const [editing, setEditing] = useState(null);

  const onSelect = (drug) => {
    setEditing({
      id: drug.id,
      drugName: drug.drugName ?? "",
      description: drug.description ?? "",
      dosage: drug.dosage ?? "",
      frequencyHours: drug.frequencyHours ?? "",
      nextIntakeTime: drug.nextIntakeTime ?? "",
      startDate: drug.startDate ?? "",
      endDate: drug.endDate ?? "",
      activeReminder: drug.activeReminder ?? true,
      active: drug.active ?? true,
    });
  };

  const onSubmit = async (payload) => {
    await updateDrug(editing.id, payload);
    setEditing(null);
  };

  return (
    <section className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Mis medicaciones</h1>
      <DrugList onSelect={onSelect} />
      {editing && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-4 w-[90%] max-w-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Editar medicación</h2>
              <button onClick={() => setEditing(null)} className="px-2 py-1 rounded hover:bg-gray-100">✕</button>
            </div>
            <DrugForm initialValues={editing} onSubmit={onSubmit} onCancel={() => setEditing(null)} submitLabel="Actualizar" />
          </div>
        </div>
      )}
    </section>
  );
}
