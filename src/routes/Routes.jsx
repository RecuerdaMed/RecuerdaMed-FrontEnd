import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import Dashboard from "../pages/Dashboard";
import AddDrug from "../pages/AddDrug";
import DrugList from "../components/medication/DrugList";
import Calendar from "../components/ui/Calendar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "medications", element: <DrugList /> },
      { path: "add-drug", element: <AddDrug /> },
      { path: "calendar", element: <Calendar /> },
      { path: "settings", element: <div className="p-4">Ajustes</div> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
