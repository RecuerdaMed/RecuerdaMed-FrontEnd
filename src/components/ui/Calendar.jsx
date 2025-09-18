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

export default function Calendar() {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date());

    const generateWeekDays = () => {
        const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });

        return Array.from({ length: 7 }, (_, index) => {
            const day = addDays(startOfCurrentWeek, index);
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

    const handlePreviousWeek = () => {
        setCurrentWeek(subWeeks(currentWeek, 1));
    };

    const handleNextWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, 1));
    };

    const handleDaySelect = (dayInfo) => {
        setSelectedDay(dayInfo.date);
        console.log(
            "Fecha seleccionada:",
            format(dayInfo.date, "PPP", { locale: es })
        );
    };

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

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-800 border-b-2 border-black pb-1 w-fit">
                    Calendario
                </h2>
                <span className="text-sm text-gray-600">{getWeekRange()}</span>
            </div>

            <div className="mb-6 text-center">
                <p className="text-sm text-gray-600 capitalize">
                    {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                </p>
                <p className="text-xs text-gray-400">
                    {format(new Date(), "HH:mm", { locale: es })}
                </p>
            </div>

            <div className="flex items-center justify-between bg-[#F3F3F3] p-2 rounded-md">
                <button
                    onClick={handlePreviousWeek}
                    className="p-2 text-gray-600 hover:bg-[#E6E6E6] rounded-full transition-colors duration-200"
                    aria-label="Semana anterior"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <div className="flex gap-1">
                    {weekDays.map((dayInfo) => (
                        <button
                            key={format(dayInfo.date, "yyyy-MM-dd")}
                            onClick={() => handleDaySelect(dayInfo)}
                            className={`
                w-10 h-14 flex flex-col items-center justify-center rounded-md
                transition-all duration-200 relative
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${dayInfo.isSelected
                                    ? "bg-[#295ADC] text-white shadow-lg transform scale-105"
                                    : dayInfo.isToday
                                        ? "bg-blue-50 text-[#295ADC] ring-2 ring-[#295ADC] ring-opacity-50 font-bold"
                                        : "bg-transparent text-gray-700 hover:bg-[#E6E6E6]"
                                }
              `}
                        >
                            <span className="text-xs font-semibold mb-1 uppercase">
                                {dayInfo.dayLetter}
                            </span>
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
                    aria-label="Semana siguiente"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {selectedDay && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-600">Fecha seleccionada:</p>
                    <p className="font-semibold text-gray-900 capitalize">
                        {format(selectedDay, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {format(selectedDay, "yyyy-MM-dd")}
                    </p>
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
