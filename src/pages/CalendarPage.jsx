import { useEffect, useState } from "react";
import { getAllDrugs } from "../services/Services";
import Calendar from "../components/ui/Calendar";

export default function CalendarPage() {
  const [meds, setMeds] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllDrugs();
      setMeds(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <p role="status" className="text-gray-800 p-4">Cargando…</p>;

  return (
    <section className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Calendario</h1>
      <Calendar medications={meds} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
    </section>
  );
}
