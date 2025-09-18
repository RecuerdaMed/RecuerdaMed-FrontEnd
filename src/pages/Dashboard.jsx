import { useEffect, useMemo, useState } from "react";
import { getAllDrugs, markAsTaken } from "../services/Services";
import { parseISO, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Dashboard() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = useMemo(() => new Date(), []);
  const todayLabel = useMemo(
    () => format(today, "EEEE, d 'de' MMMM", { locale: es }),
    [today]
  );

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

  const isDueToday = (d) => {
    const start = d.startDate ? parseISO(d.startDate) : null;
    const end = d.endDate ? parseISO(d.endDate) : null;
    if (!start) return false;
    const inRange = isSameDay(today, start) || (today >= start && (!end || today <= end));
    return inRange && !d.taken;
  };

  const todays = drugs.filter(isDueToday).sort((a,b) => (a.nextIntakeTime||"").localeCompare(b.nextIntakeTime||""));
  const upcoming = todays.slice().filter(d => d.nextIntakeTime).sort((a,b)=>a.nextIntakeTime.localeCompare(b.nextIntakeTime));
  const pendingCount = todays.length;

  const takeNow = async (id) => {
    await markAsTaken(id);
    load();
  };

  return (
    <main className="mx-auto max-w-5xl p-4 space-y-6" aria-labelledby="home-title">
      <header className="space-y-2">
        <h1 id="home-title" className="text-2xl sm:text-3xl font-bold text-gray-900">Hoy</h1>
        <p className="text-blue-700 text-lg">{todayLabel}</p>
      </header>

      <section aria-labelledby="quick-actions" className="flex flex-wrap gap-3">
        <Link to="/add-drug"><Button>Añadir medicación</Button></Link>
        <Link to="/medicaciones"><Button className="bg-white text-[#295ADC] border border-[#295ADC]">Ver todas</Button></Link>
        <Link to="/calendar"><Button className="bg-white text-[#295ADC] border border-[#295ADC]">Calendario</Button></Link>
      </section>

      <section aria-labelledby="pending-today" className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 id="pending-today" className="text-xl font-semibold text-gray-900">Pendientes de hoy</h2>
          <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-full bg-red-600 text-white text-sm">{pendingCount}</span>
        </div>
        {loading && <p role="status" className="text-gray-700">Cargando…</p>}
        {!loading && pendingCount === 0 && <p className="text-gray-700">No hay medicaciones pendientes hoy.</p>}
        <ul className="divide-y" role="list">
          {todays.map(d => (
            <li key={d.id} className="py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900">{d.drugName}{d.dosage ? ` · ${d.dosage}` : ""}</p>
                <p className="text-sm text-gray-700">{d.nextIntakeTime ? `A las ${d.nextIntakeTime}` : "Sin hora"}{d.frequencyHours ? ` · cada ${d.frequencyHours}h` : ""}</p>
              </div>
              <Button onClick={() => takeNow(d.id)} className="px-4">Tomada</Button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="upcoming" className="bg-white rounded-lg border p-4">
        <h2 id="upcoming" className="text-xl font-semibold text-gray-900 mb-3">Próximas de hoy</h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-700">No hay próximas tomas programadas.</p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-3" role="list">
            {upcoming.map(d => (
              <li key={d.id} className="rounded-md border p-3">
                <p className="font-medium text-gray-900">{d.drugName}</p>
                <p className="text-sm text-gray-700">{d.nextIntakeTime || "Sin hora"}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
