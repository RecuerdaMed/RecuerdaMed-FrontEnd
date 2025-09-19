import { useRef, useState } from "react";
import DrugList from "../components/medication/DrugList";
import DrugForm from "../components/medication/DrugForm";
import { createDrug, updateDrug } from "../services/Services";

export default function Medications() {
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const reloadRef = useRef(null);

  const handleCreated = async (payload) => {
    setLoading(true);
    setError("");
    try {
      await createDrug(payload);
      if (reloadRef.current) reloadRef.current();
      
      
      const list = document.getElementById("med-list");
      if (list) {
        setTimeout(() => {
          list.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch (err) {
      setError("Error al crear el medicamento. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      active: drug.active ?? true,
      activeReminder: drug.activeReminder ?? true,
    });
  };

  const onUpdate = async (payload) => {
    setLoading(true);
    setError("");
    try {
      await updateDrug(editing.id, payload);
      setEditing(null);
      if (reloadRef.current) reloadRef.current();
    } catch (err) {
      setError("Error al actualizar el medicamento. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (!loading) { 
      setEditing(null);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Mi medicación</h1>
        <p className="text-gray-600">Gestiona tu medicación, horarios y dosis</p>
        
        
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
            {error}
            <button 
              onClick={() => setError("")}
              className="ml-2 text-red-800 hover:text-red-900"
              aria-label="Cerrar error"
            >
              ✕
            </button>
          </div>
        )}
      </header>

      
      <section 
        id="nuevo" 
        aria-labelledby="new-title" 
        className="bg-white rounded-lg border p-6 shadow-sm"
      >
        <h2 id="new-title" className="text-xl font-semibold text-gray-900 mb-4">
          Añadir medicación
        </h2>
        <DrugForm 
          onSubmit={handleCreated} 
          submitLabel={loading ? "Guardando..." : "Guardar medicamento"}
          disabled={loading}
        />
      </section>

      
      <section 
        id="med-list" 
        className="bg-white rounded-lg border shadow-sm"
      >
        <DrugList 
          onSelect={onSelect} 
          onReload={(fn) => (reloadRef.current = fn)}
          disabled={loading} 
        />
      </section>

      
      {editing && (
        <div 
          role="dialog" 
          aria-modal="true" 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Editar medicación
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                aria-label="Cerrar modal"
                disabled={loading}
              >
                ✕
              </button>
            </div>
            
            
            <div className="p-4">
              <DrugForm 
                initialValues={editing} 
                onSubmit={onUpdate} 
                onCancel={handleCloseModal} 
                submitLabel={loading ? "Actualizando..." : "Actualizar medicamento"}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      )}

      
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <p className="text-gray-700">Procesando...</p>
          </div>
        </div>
      )}
    </main>
  );
}