import { useEffect, useState } from "react";
import { getAllDrugs, deleteDrug, markAsTaken } from "../../services/Services";
import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import { Edit, Trash2, CheckCircle, Clock, Repeat } from "lucide-react";
import Button from "../ui/Button";

export default function DrugList({ onSelect, onReload, disabled = false }) {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, taken

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllDrugs();
      setDrugs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Error al cargar los medicamentos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Exponer la función reload al componente padre
  useEffect(() => {
    if (onReload) onReload(load);
  }, [onReload]);

  const handleDelete = async (id, drugName) => {
    if (!confirm(`¿Confirmas que deseas eliminar "${drugName}"?\n\nEsta acción no se puede deshacer.`)) return;
    
    try {
      await deleteDrug(id);
      await load(); // Recargar la lista
    } catch (err) {
      setError("Error al eliminar el medicamento");
      console.error(err);
    }
  };

  const handleMarkAsTaken = async (id) => {
    try {
      await markAsTaken(id);
      await load(); // Recargar la lista
    } catch (err) {
      setError("Error al marcar como tomado");
      console.error(err);
    }
  };

  // Filtrar medicamentos
  const filteredDrugs = drugs.filter(drug => {
    if (filter === "active") return drug.active && !drug.taken;
    if (filter === "taken") return drug.taken;
    return true; // "all"
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    try {
      return format(parseISO(dateString), "dd/MM/yyyy", { locale: es });
    } catch {
      return "Fecha inválida";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-3 text-gray-600">Cargando medicamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Lista de medicación ({filteredDrugs.length})
        </h2>
        
        {/* Filtros */}
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "primary" : "neutral"}
            size="small"
          >
            Todos
          </Button>
          <Button
            onClick={() => setFilter("active")}
            variant={filter === "active" ? "primary" : "neutral"}
            size="small"
          >
            Activos
          </Button>
          <Button
            onClick={() => setFilter("taken")}
            variant={filter === "taken" ? "primary" : "neutral"}
            size="small"
          >
            Tomados
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {filteredDrugs.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No hay medicamentos
          </h3>
          <p className="text-gray-600">
            {filter === "all" ? "No hay medicamentos registrados" : 
             filter === "active" ? "No hay medicamentos activos" :
             "No hay medicamentos marcados como tomados"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDrugs.map((drug) => (
            <div
              key={drug.id}
              className={`border rounded-xl p-6 transition-all hover:shadow-md ${
                drug.taken ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      drug.taken ? "bg-green-400" : drug.active ? "bg-orange-400" : "bg-gray-400"
                    }`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {drug.drugName}
                    </h3>
                    {drug.dosage && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {drug.dosage}
                      </span>
                    )}
                    {drug.taken && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        Tomado
                      </span>
                    )}
                    {!drug.active && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                        Inactivo
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600 mb-4">
                    {drug.nextIntakeTime && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                        <span><strong>Próxima:</strong> {drug.nextIntakeTime}</span>
                      </div>
                    )}
                    {drug.frequencyHours && (
                      <div className="flex items-center">
                        <Repeat className="w-4 h-4 mr-2 text-purple-600" />
                        <span><strong>Cada:</strong> {drug.frequencyHours}h</span>
                      </div>
                    )}
                    {drug.startDate && (
                      <div className="flex items-center">
                        <span><strong>Inicio:</strong> {formatDate(drug.startDate)}</span>
                      </div>
                    )}
                    {drug.endDate && (
                      <div className="flex items-center">
                        <span><strong>Fin:</strong> {formatDate(drug.endDate)}</span>
                      </div>
                    )}
                  </div>
                  
                  {drug.description && (
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {drug.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  {!drug.taken && drug.active && (
                    <Button
                      onClick={() => handleMarkAsTaken(drug.id)}
                      variant="success"
                      size="small"
                      disabled={disabled}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Marcar tomado
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => onSelect(drug)}
                    variant="neutral"
                    size="small"
                    disabled={disabled}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </Button>
                  
                  <Button
                    onClick={() => handleDelete(drug.id, drug.drugName)}
                    variant="dangerOutline"
                    size="small"
                    disabled={disabled}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}