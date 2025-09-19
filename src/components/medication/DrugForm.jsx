import { useState, useMemo } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function DrugForm({ initialValues, onSubmit, onCancel, submitLabel = "Guardar" }) {
  const init = useMemo(() => ({
    drugName: "",
    description: "",
    dosage: "",
    frequencyHours: "",
    nextIntakeTime: "",
    startDate: "",
    endDate: "",
    activeReminder: true,
    ...initialValues
  }), [initialValues]);

  const [form, setForm] = useState(init);
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      drugName: form.drugName,
      description: form.description || "",
      dosage: form.dosage,
      frequencyHours: form.frequencyHours ? parseInt(form.frequencyHours, 10) : null,
      nextIntakeTime: form.nextIntakeTime?.length === 5 ? `${form.nextIntakeTime}:00` : form.nextIntakeTime || "",
      startDate: form.startDate ? `${form.startDate}T00:00:00` : null,
      endDate: form.endDate ? `${form.endDate}T00:00:00` : null,
      active: true,
      activeReminder: !!form.activeReminder
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3" aria-labelledby="drug-form-title">
      <h2 id="drug-form-title" className="sr-only">Formulario de medicamentos</h2>
      <Input label="Nombre del medicamento" value={form.drugName} onChange={update("drugName")} required />
      <Input label="Descripción" value={form.description} onChange={update("description")} />
      <Input label="Dosis" value={form.dosage} onChange={update("dosage")} required />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Hora de toma" type="time" value={form.nextIntakeTime} onChange={update("nextIntakeTime")} required />
        <Input label="Frecuencia (horas)" type="number" value={form.frequencyHours} onChange={update("frequencyHours")} required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Fecha inicio" type="date" value={form.startDate} onChange={update("startDate")} required />
        <Input label="Fecha fin" type="date" value={form.endDate} onChange={update("endDate")} />
      </div>
      <div className="flex items-center gap-2">
        <input id="activeReminder" type="checkbox" checked={!!form.activeReminder} onChange={update("activeReminder")} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <label htmlFor="activeReminder" className="text-sm text-gray-800">Recordatorio activo</label>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && <Button type="button" className="bg-gray-200 text-gray-700" onClick={onCancel}>Cancelar</Button>}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
