import { useEffect, useState } from "react";
import { getAllDrugs, deleteDrug } from "../../services/Services";
import Button from "../ui/Button";

export default function DrugList({ onSelect }) {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllDrugs();
      setDrugs(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <p role="status" className="text-gray-800">Cargando medicación…</p>;
  if (!drugs.length) return <p className="text-gray-800">No hay medicación registrada.</p>;

  return (
    <section aria-labelledby="med-list-title">
      <h2 id="med-list-title" className="text-xl font-semibold text-gray-900 mb-3">medicamentos</h2>
      <ul className="space-y-2" role="list" aria-label="Lista de medicación">
        {drugs.map(d => (
          <li key={d.id} className="flex items-center justify-between rounded border p-3">
            <div>
              <p className="font-semibold text-gray-900">{d.drugName}{d.dosage ? ` · ${d.dosage}` : ""}</p>
              <p className="text-sm text-gray-800">
                {d.startDate || "—"}{d.nextIntakeTime ? ` · ${d.nextIntakeTime}` : ""}{d.frequencyHours ? ` · cada ${d.frequencyHours}h` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              {onSelect && (
                <Button onClick={() => onSelect(d)} className="py-1 px-3" aria-label={`Editar ${d.drugName}`}>Editar</Button>
              )}
              <button
                className="text-sm px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700"
                onClick={async () => { await deleteDrug(d.id); load(); }}
                aria-label={`Eliminar ${d.drugName}`}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
