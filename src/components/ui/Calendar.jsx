import { useState } from "react";
import {
    startOfWeek,
    addDays,
    format,
    addWeeks,
    subWeeks,
    isToday,
    isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";

export default function Calendar({ medications, selectedDay, setSelectedDay }) {
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const generateWeekDays = () => {
        const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
        return Array.from({ length: 7 }, (_, i) => {
            const day = addDays(startOfCurrentWeek, i);
            return {
                date: day,
                dayLetter: format(day, "EEEEE", { locale: es }),
                dayNumber: format(day, "d"),
                isToday: isToday(day),
                isSelected: isSameDay(day, selectedDay),
            };
        });
    };

    const weekDays = generateWeekDays();

    const handlePreviousWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
    const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));
    const goToToday = () => {
        const today = new Date();
        setCurrentWeek(today);
        setSelectedDay(today);
    };

    const getWeekRange = () => {
        const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
        const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);
        return `${format(startOfCurrentWeek, "d MMM", { locale: es })} - ${format(
            endOfCurrentWeek,
            "d MMM yyyy",
            { locale: es }
        )}`;
    };

    const medsOfDay = medications.filter((med) => {
        const start = new Date(med.startDate);
        const end = new Date(med.endDate);
        return selectedDay >= start && selectedDay <= end && !med.taken;
    });

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-800 border-b-2 border-black pb-1 w-fit">
                    Calendario
                </h2>
                <span className="text-sm text-gray-600">{getWeekRange()}</span>
            </div>

            <div className="flex items-center justify-between bg-[#F3F3F3] p-2 rounded-md">
                <button
                    onClick={handlePreviousWeek}
                    className="p-2 text-gray-600 hover:bg-[#E6E6E6] rounded-full transition-colors duration-200"
                >
                    ←
                </button>

                <div className="flex gap-1">
                    {weekDays.map((dayInfo) => (
                        <button
                            key={format(dayInfo.date, "yyyy-MM-dd")}
                            onClick={() => setSelectedDay(dayInfo.date)}
                            className={`
                w-10 h-14 flex flex-col items-center justify-center rounded-md
                transition-all duration-200 relative
                focus:outline-none focus:ring-2 focus:ring-blue-500  cursor-pointer
                ${dayInfo.isSelected
                                    ? "bg-[#295ADC] text-white shadow-lg transform scale-105"
                                    : dayInfo.isToday
                                        ? "bg-blue-50 text-[#295ADC] ring-2 ring-[#295ADC] ring-opacity-50 font-bold"
                                        : "bg-transparent text-gray-700 hover:bg-[#E6E6E6]"
                                }
              `}
                        >
                            <span className="text-xs font-semibold mb-1 uppercase">{dayInfo.dayLetter}</span>
                            <span className="text-lg font-semibold">{dayInfo.dayNumber}</span>
                            {dayInfo.isToday && !dayInfo.isSelected && (
                                <div className="absolute bottom-1 w-2 h-2 bg-[#295ADC] rounded-full animate-pulse"></div>
                            )}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleNextWeek}
                    className="p-2 text-gray-600 hover:bg-[#E6E6E6] rounded-full transition-colors duration-200"
                >
                    →
                </button>
            </div>

            {selectedDay && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-600">Fecha seleccionada:</p>
                    <p className="font-semibold text-gray-900 capitalize">
                        {format(selectedDay, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                    </p>

                    <div className="mt-2">
                        <h4 className="font-semibold text-gray-700">Medicaciones del día</h4>
                        {medsOfDay.length === 0 ? (
                            <p className="text-sm text-gray-400">No hay medicaciones pendientes</p>
                        ) : (
                            medsOfDay.map((med) => (
                                <div
                                    key={med.id}
                                    className="p-2 border-b border-gray-200 flex justify-between items-center"
                                >
                                    <p>{med.title}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            <div className="mt-4 text-center">
                <button
                    onClick={goToToday}
                    className="px-4 py-2 text-sm text-[#295ADC] hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                    Ir a hoy
                </button>
            </div>
        </div>
    );
}
