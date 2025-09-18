import DrugCard from "../components/medication/DrugCard";

export default function Dashboard() {
  return (
    <section aria-labelledby="dashboard-title" className="w-full">
      <h1 id="dashboard-title" className="sr-only">Panel principal</h1>
      <DrugCard />
    </section>
  );
}
