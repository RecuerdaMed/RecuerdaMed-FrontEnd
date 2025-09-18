import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import AddDrug from "../../pages/AddDrug";
import Calendar from "../ui/Calendar";

export default function DrugCard() {
    const today = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
    const [medications, setMedications] = useState(() => {
        const stored = localStorage.getItem("medications");
        return stored ? JSON.parse(stored) : [];
    });
    const [selectedDay, setSelectedDay] = useState(new Date());

    useEffect(() => {
        localStorage.setItem("medications", JSON.stringify(medications));
    }, [medications]);

    const handleTake = (id) => setMedications(prev => prev.map(med => med.id === id ? { ...med, taken: true } : med));

    const addMedication = (newMed) => setMedications(prev => [...prev, newMed]);

    const handleEdit = (id, updatedMed) => setMedications(prev => prev.map(med => med.id === id ? { ...med, ...updatedMed } : med));

    const handleDelete = (id) => setMedications(prev => prev.filter(med => med.id !== id));

    return (
        <section className="max-w-5xl mx-auto p-6">
            <section className="mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Recordatorios</h1>
                <p className="text-blue-600 text-lg mt-4">Hoy, {today}</p>
            </section>

            <AddDrug addMedication={addMedication} />

            <div className="md:flex md:gap-16">
                <section className="md:w-1/2 md:pr-12 md:border-r md:border-gray-300 mb-10 md:mb-0">
                    <h2 className="text-xl font-semibold text-gray-700 mb-8">No tomada</h2>
                    {medications.filter(med => !med.taken).map(med => (
                        <Card
                            key={med.id}
                            id={med.id}
                            title={med.title}
                            time={med.time}
                            startDate={med.startDate}
                            endDate={med.endDate}
                            frequency={med.frequency}
                            next={med.next}
                            taken={med.taken}
                            onTake={() => handleTake(med.id)}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </section>

                <section className="md:w-1/2 md:pl-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-8">Tomada</h2>
                    {medications.filter(med => med.taken).map(med => (
                        <Card
                            key={med.id}
                            id={med.id}
                            title={med.title}
                            taken={med.taken}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </section>
            </div>

            <div className="mt-10">
                <Calendar
                    medications={medications}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                />
            </div>
        </section>
    );
}
