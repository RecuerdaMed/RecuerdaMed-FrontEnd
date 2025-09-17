import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddMedication from "../pages/AddMedication";
//import Reminders from "../pages/Reminders";
//import Login from "../pages/Login";
//import Register from "../pages/Register";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-medication" element={<AddMedication />} />
      {/* <Route path="/reminders" element={<Reminders />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
    </Routes>
  );
}

export default RoutesApp;