import React, { useState } from "react";
import Card from "../ui/Card";

export default function DrugCard() {
    const today = new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const [medications, setMedications] = useState([
        { id: 1, title: "Medicación 1", time: "02:00 am", next: "10:00 am", taken: false },
        { id: 2, title: "Medicación 2", time: "11:00 am", next: "19:00 pm", taken: false },
        { id: 3, title: "Medicación 3", time: "08:00 am", next: "20:00 pm", taken: true },
    ]);

    const handleTake = (id) => {
        setMedications((prev) =>
            prev.map((med) =>
                med.id === id ? { ...med, taken: true } : med
            )
        );
    };

    return (
        <section className="max-w-5xl mx-auto p-6">
            <section className="mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                    Recordatorios
                </h1>
                <p className="text-blue-600 text-lg mt-4">Hoy, {today}</p>
            </section>

            <section className="md:flex md:gap-16">
                <section className="md:w-1/2 md:pr-12 md:border-r md:border-gray-300 mb-10 md:mb-0">
                    <h2 className="text-xl font-semibold text-gray-700 mb-8">
                        No tomada
                    </h2>
                    {medications
                        .filter((med) => !med.taken)
                        .map((med) => (
                            <Card
                                key={med.id}
                                title={med.title}
                                time={med.time}
                                next={med.next}
                                taken={med.taken}
                                onTake={() => handleTake(med.id)}
                            />
                        ))}
                </section>

                <section className="md:w-1/2 md:pl-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-8">
                        Tomada
                    </h2>
                    {medications
                        .filter((med) => med.taken)
                        .map((med) => (
                            <Card
                                key={med.id}
                                title={med.title}
                                time={med.time}
                                next={med.next}
                                taken={med.taken}
                            />
                        ))}
                </section>
            </section>
        </section>
    );
}
