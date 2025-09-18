import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Button from "./Button";

export default function Card({
    id,
    title,
    time,
    startDate,
    endDate,
    frequency,
    nextDate,
    taken,
    onTake,
    onEdit,
    onDelete
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editTime, setEditTime] = useState(time);
    const [editStartDate, setEditStartDate] = useState(startDate || "");
    const [editEndDate, setEditEndDate] = useState(endDate || "");
    const [editFrequency, setEditFrequency] = useState(frequency || "");
    const [computedNextDate, setComputedNextDate] = useState(nextDate || "");

    useEffect(() => {
        if (editStartDate && editTime && editFrequency) {
            const startDateTime = new Date(`${editStartDate}T${editTime}`);
            const nextDateTime = new Date(
                startDateTime.getTime() + Number(editFrequency) * 60 * 60 * 1000
            );
            setComputedNextDate(
                nextDateTime.toLocaleString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                })
            );
        }
    }, [editStartDate, editTime, editFrequency]);

    const handleSave = () => {
        onEdit(id, {
            title: editTitle,
            time: editTime,
            startDate: editStartDate,
            endDate: editEndDate,
            frequency: editFrequency
        });
        setIsEditing(false);
    };

    return (
        <article className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl p-5 flex flex-col mb-5">
            <section className="flex justify-between items-center mb-4">
                {!isEditing ? (
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                            {taken && <span className="text-green-500 text-2xl ml-2">✅</span>}
                        </div>

                        {!taken && (
                            <>
                                <p className="text-blue-600 font-medium">Hora: {time}</p>
                                <p className="text-gray-500 text-sm">
                                    Desde: {startDate} hasta: {endDate || "—"}
                                </p>
                                <p className="text-gray-500 text-sm">Frecuencia: {frequency} hrs</p>
                                <p className="text-gray-500 text-sm">Próxima toma: {computedNextDate}</p>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 w-full">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="border px-2 py-1 rounded"
                        />
                        <input
                            type="time"
                            value={editTime}
                            onChange={(e) => setEditTime(e.target.value)}
                            className="border px-2 py-1 rounded"
                        />
                        <input
                            type="date"
                            value={editStartDate}
                            onChange={(e) => setEditStartDate(e.target.value)}
                            className="border px-2 py-1 rounded"
                        />
                        <input
                            type="date"
                            value={editEndDate}
                            onChange={(e) => setEditEndDate(e.target.value)}
                            className="border px-2 py-1 rounded"
                        />
                        <input
                            type="number"
                            value={editFrequency}
                            onChange={(e) => setEditFrequency(e.target.value)}
                            className="border px-2 py-1 rounded"
                        />
                        <p className="text-gray-500 text-sm mt-1">Próxima toma: {computedNextDate}</p>
                    </div>
                )}

                {!taken && !isEditing && (
                    <Button
                        onClick={onTake}
                        className="w-auto py-1 px-4 rounded-full bg-blue-600 hover:bg-blue-700 transform transition-all duration-300 hover:scale-110"
                    >
                        Tomada
                    </Button>
                )}
            </section>

            <section className="flex justify-end gap-3 mt-4">
                {!isEditing ? (
                    <>
                        {!taken && (
                            <button
                                className="flex items-center gap-1 text-gray-600 text-sm hover:text-blue-600 transition-colors cursor-pointer"
                                onClick={() => setIsEditing(true)}
                            >
                                <Pencil size={16} /> Editar
                            </button>
                        )}
                        <button
                            className="flex items-center gap-1 text-gray-600 text-sm hover:text-red-600 transition-colors cursor-pointer"
                            onClick={() => onDelete(id)}
                        >
                            <Trash2 size={16} /> Eliminar
                        </button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleSave}>Guardar</Button>
                        <Button
                            className="bg-gray-200 text-gray-700"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancelar
                        </Button>
                    </>
                )}
            </section>
        </article>
    );
}
