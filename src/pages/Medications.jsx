import DrugList from "../components/medication/DrugList";

export default function Medications() {
  return (
    <section className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Mis medicaciones</h1>
      <DrugList />
    </section>
  );
}
