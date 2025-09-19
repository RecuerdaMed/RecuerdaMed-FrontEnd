import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import Dashboard from "../pages/Dashboard";
import Medications from "../pages/Medications";
import CalendarPage from "../pages/CalendarPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "medicamentos", element: <Medications /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "settings", element: <div className="p-4">Ajustes (por implementar)</div> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}