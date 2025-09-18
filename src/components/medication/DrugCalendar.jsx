import { useMemo, useState, useCallback } from "react";
import {
  startOfWeek,
  addDays,
  format,
  addWeeks,
  subWeeks,
  isToday,
  isSameDay,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";

export default function Calendar({ medications = [], selectedDay, setSelectedDay }) {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const startOfCurrentWeek = useMemo(
    () => startOfWeek(currentWeek, { weekStartsOn: 1 }),
    [currentWeek]
  );

  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const day = addDays(startOfCurrentWeek, i);
        return {
          date: day,
          key: format(day, "yyyy-MM-dd"),
          letter: format(day, "EEEEE", { locale: es }).toUpperCase(),
          number: format(day, "d", { locale: es }),
          isToday: isToday(day),
          isSelected: selectedDay ? isSameDay(day, selectedDay) : false,
          fullLabel: format(day, "EEEE d 'de' MMMM 'de' yyyy", { locale: es }),
        };
      }),
    [startOfCurrentWeek, selectedDay]
  );

  const handlePreviousWeek = () => setCurrentWeek((d) => subWeeks(d, 1));
  const handleNextWeek = () => setCurrentWeek((d) => addWeeks(d, 1));
  const goToToday = () => {
    const today = new Date();
    setCurrentWeek(today);
    setSelectedDay(today);
  };

  const onDaySelect = useCallback(
    (date) => {
      setSelectedDay(date);
    },
    [setSelectedDay]
  );

  const handleKeyDown = (e) => {
    const idx = weekDays.findIndex((d) => d.isSelected) ?? -1;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (idx > 0) onDaySelect(weekDays[idx - 1].date);
      else handlePreviousWeek();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (idx >= 0 && idx < weekDays.length - 1) onDaySelect(weekDays[idx + 1].date);
      else handleNextWeek();
    }
  };

  const rangeLabel = `${format(startOfCurrentWeek, "d MMM", { locale: es })} – ${format(
    addDays(startOfCurrentWeek, 6),
    "d MMM yyyy",
    { locale: es }
  )}`;

  const medsOfDay = useMemo(() => {
    if (!selectedDay) return [];
    return medications.filter((med) => {
      const start = med.startDate ? parseISO(med.startDate) : null;
      const end = med.endDate ? parseISO(med.endDate) : null;
      if (!start) return false;
      const afterStart = selectedDay >= start;
      const beforeEnd = end ? selectedDay <= end : true;
      return afterStart && beforeEnd && !med.taken;
    });
  }, [medications, selectedDay]);

  return (
    <section aria-labelledby="calendar-title" className="container mx-auto p-4 max-w-lg">
      <header className="flex items-center justify-between mb-4">
        <h2 id="calendar-title" className="text-lg font-semibold text-gray-900">
          Calendario
        </h2>
        <p className="text-sm text-gray-600" aria-live="polite">{rangeLabel}</p>
      </header>

      <nav
        aria-label="Selector de semana"
        className="flex items-center justify-between bg-[#F3F3F3] p-2 rounded-md"
      >
        <button
          type="button"
          onClick={handlePreviousWeek}
          className="p-2 text-gray-700 hover:bg-[#E6E6E6] rounded-full transition-colors duration-200 text-lg"
          aria-label="Semana anterior"
        >
          ←
        </button>

        <ul
          className="flex gap-1"
          role="listbox"
          aria-label="Días de la semana"
          onKeyDown={handleKeyDown}
        >
          {weekDays.map((d) => (
            <li key={d.key}>
              <button
                type="button"
                role="option"
                aria-selected={d.isSelected}
                aria-current={d.isToday ? "date" : undefined}
                aria-label={`${d.fullLabel}${d.isToday ? " (hoy)" : ""}`}
                onClick={() => onDaySelect(d.date)}
                className={[
                  "w-12 h-16 flex flex-col items-center justify-center rounded-md",
                  "transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer",
                  d.isSelected
                    ? "bg-[#295ADC] text-white shadow-lg scale-105"
                    : d.isToday
                    ? "bg-blue-50 text-[#295ADC] ring-2 ring-[#295ADC] ring-opacity-50 font-bold"
                    : "bg-transparent text-gray-800 hover:bg-[#E6E6E6]",
                ].join(" ")}
              >
                <span className="text-xs font-semibold mb-1">{d.letter}</span>
                <span className="text-lg font-semibold">{d.number}</span>
                {d.isToday && !d.isSelected && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 w-2 h-2 bg-[#295ADC] rounded-full animate-pulse"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleNextWeek}
          className="p-2 text-gray-700 hover:bg-[#E6E6E6] rounded-full transition-colors duration-200 text-lg"
          aria-label="Semana siguiente"
        >
          →
        </button>
      </nav>

      {selectedDay && (
        <section
          aria-labelledby="selected-date-title"
          className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
        >
          <p id="selected-date-title" className="text-sm text-gray-600">
            Fecha seleccionada
          </p>
          <p className="font-semibold text-gray-900 capitalize">
            {format(selectedDay, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
          </p>

          <section className="mt-3" aria-labelledby="day-meds-title">
            <h3 id="day-meds-title" className="font-semibold text-gray-800">
              Medicamentos del día
            </h3>

            {medsOfDay.length === 0 ? (
              <p className="text-sm text-gray-500 mt-1">No hay medicamentos pendientes</p>
            ) : (
              <ul className="mt-2 divide-y divide-gray-200" role="list">
                {medsOfDay.map((med) => (
                  <li
                    key={med.id}
                    className="py-2 flex items-center justify-between"
                    aria-label={`${med.drugName} ${med.dosage ?? ""}`}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{med.drugName}</p>
                      <p className="text-sm text-gray-600">
                        {med.dosage ?? ""} {med.nextIntakeTime ? `· ${med.nextIntakeTime}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </section>
      )}

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={goToToday}
          className="px-4 py-2 text-sm text-[#295ADC] hover:bg-blue-50 rounded-lg transition-colors duration-200"
        >
          Ir a hoy
        </button>
      </div>
    </section>
  );
}
