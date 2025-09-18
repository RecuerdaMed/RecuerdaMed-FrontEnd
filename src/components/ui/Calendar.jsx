import { useState } from "react";

export default function Calendar() {
  const daysOfWeek = [
    { day: "L", number: 31 },
    { day: "M", number: 1 },
    { day: "M", number: 2 },
    { day: "J", number: 3 },
    { day: "V", number: 4 },
    { day: "S", number: 5 },
    { day: "D", number: 6 },
  ];
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-lg font-medium text-gray-800 border-b-2 border-black pb-1 mb-8 w-fit">
        Calendario
      </h2>

      <div className="flex items-center justify-between bg-[#F3F3F3] p-2 rounded-md">
        <button
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
          {daysOfWeek.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDay(day.number)}
              className={`
                w-10 h-14 flex flex-col items-center justify-center rounded-md
                transition-colors duration-200
                ${
                  selectedDay === day.number
                    ? "bg-[#295ADC] text-white"
                    : "bg-transparent text-gray-700 hover:bg-[#E6E6E6]"
                }
              `}
            >
              <span className="text-xs font-semibold mb-1">{day.day}</span>
              <span className="text-lg font-semibold">{day.number}</span>
            </button>
          ))}
        </div>

        <button
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
    </div>
  );
}
