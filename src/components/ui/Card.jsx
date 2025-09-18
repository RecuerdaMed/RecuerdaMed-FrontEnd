import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Button from "./Button";

export default function Card({ title, time, next, taken, onTake }) {
    return (
        <article className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl p-5 flex flex-col mb-5">
            <section className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                        <p className="text-blue-600 font-medium">{time}</p>
                        <p className="text-gray-500 text-sm">Siguiente: {next}</p>
                    </div>
                    {taken && (
                        <span className="text-green-500 text-2xl ml-auto">
                            ✅
                        </span>
                    )}
                </div>

                {!taken && (
                    <Button
                        onClick={onTake}
                        className="w-auto py-1 px-4 rounded-full bg-blue-600 hover:bg-blue-700 transform transition-all duration-300 hover:scale-110"
                    >
                        Tomada
                    </Button>
                )}
            </section>

            <section className="flex justify-end gap-3 mt-4">
                <button className="flex items-center gap-1 text-gray-600 text-sm hover:text-blue-600 transition-colors cursor-pointer">
                    <Pencil size={16} />
                    Editar
                </button>

                <button className="flex items-center gap-1 text-gray-600 text-sm hover:text-red-600 transition-colors cursor-pointer">
                    <Trash2 size={16} />
                    Eliminar
                </button>
            </section>
        </article>
    );
}
