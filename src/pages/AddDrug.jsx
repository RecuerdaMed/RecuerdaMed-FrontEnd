import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DrugForm from "../components/medication/DrugForm";
import { createDrug } from "../services/Services";

export default function AddDrug() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      await createDrug(payload);
      navigate("/medicaciones");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="add-title" className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-sm">
      <h1 id="add-title" className="text-2xl font-semibold text-gray-900 mb-4">Añadir medicación</h1>
      <DrugForm onSubmit={handleSubmit} submitLabel={submitting ? "Guardando…" : "Guardar"} />
    </section>
  );
}
