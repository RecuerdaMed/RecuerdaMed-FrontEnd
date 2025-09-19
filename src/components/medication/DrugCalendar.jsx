import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function MedicationCalendar({ medications = [], selectedDay, setSelectedDay }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  // Obtener medicamentos para un día específico
  const getMedicationsForDay = (day) => {
    return medications.filter(med => {
      const startDate = new Date(med.startDate);
      const endDate = med.endDate ? new Date(med.endDate) : null;
      return day >= startDate && (!endDate || day <= endDate) && med.active;
    });
  };

  const getDayStatus = (day) => {
    const dayMeds = getMedicationsForDay(day);
    if (dayMeds.length === 0) return 'none';
    
    const pending = dayMeds.filter(med => !med.taken).length;
    const total = dayMeds.length;
    
    if (pending === 0) return 'completed';
    if (pending === total) return 'pending';
    return 'partial';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'partial': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-300';
      case 'pending': return 'bg-orange-100 border-orange-300';
      case 'partial': return 'bg-blue-100 border-blue-300';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-w-5xl mx-auto">
      {/* Header del calendario */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </h2>
          <div className="flex gap-3">
            <Button variant="secondary" size="md" onClick={prevMonth}>
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-1 hidden sm:inline">Anterior</span>
            </Button>
            <Button variant="secondary" size="md" onClick={nextMonth}>
              <span className="mr-1 hidden sm:inline">Siguiente</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Completado</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Parcial</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span>Pendiente</span>
          </div>
        </div>

        {/* Día seleccionado info */}
        {selectedDay && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3 text-lg">
              {format(selectedDay, "EEEE, d 'de' MMMM", { locale: es })}
            </h3>
            <div className="space-y-3">
              {getMedicationsForDay(selectedDay).map(med => (
                <div key={med.id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <span className="font-medium text-gray-900">{med.drugName}</span>
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {med.dosage}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">{med.nextIntakeTime}</span>
                    {med.taken ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                </div>
              ))}
              {getMedicationsForDay(selectedDay).length === 0 && (
                <p className="text-gray-600 text-center py-4">
                  No hay medicamentos programados para este día
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="p-4 text-center font-semibold text-gray-700 bg-gray-50 text-base">
            {day}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7">
        {monthDays.map(day => {
          const dayMeds = getMedicationsForDay(day);
          const status = getDayStatus(day);
          const isSelected = selectedDay && isSameDay(day, selectedDay);
          const isCurrentDay = isToday(day);

          return (
            <button
              key={day.toString()}
              onClick={() => setSelectedDay(day)}
              className={`
                p-4 min-h-[120px] border-b border-r border-gray-200 text-left hover:bg-gray-50 
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isSelected ? 'bg-blue-100 border-blue-300 ring-2 ring-blue-500' : ''}
                ${isCurrentDay ? 'bg-yellow-50 font-bold' : ''}
                ${getStatusColor(status)}
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`
                  text-lg font-semibold
                  ${isCurrentDay ? 'text-blue-600' : 'text-gray-900'}
                  ${isSelected ? 'text-blue-800' : ''}
                `}>
                  {format(day, 'd')}
                </span>
                {getStatusIcon(status)}
              </div>

              {/* Medicamentos del día */}
              {dayMeds.length > 0 && (
                <div className="space-y-1">
                  {dayMeds.slice(0, 2).map(med => (
                    <div key={med.id} className="text-xs bg-white rounded px-2 py-1 truncate">
                      <span className={med.taken ? 'line-through text-gray-500' : 'text-gray-800'}>
                        {med.drugName}
                      </span>
                    </div>
                  ))}
                  {dayMeds.length > 2 && (
                    <div className="text-xs text-gray-500 text-center font-medium">
                      +{dayMeds.length - 2} más
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}