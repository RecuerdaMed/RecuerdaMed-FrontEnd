import { NavLink } from "react-router-dom";

const linkBase =
  "px-4 py-2 rounded-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#295ADC]";
const linkInactive = "text-gray-700 hover:bg-blue-50";
const linkActive = "bg-[#295ADC] text-white";

const linkClass = ({ isActive }) =>
  [linkBase, isActive ? linkActive : linkInactive].join(" ");

export default function NavBar() {
  return (
    <nav
      className="w-full border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-40"
      aria-label="Navegación principal"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
       

        <ul className="flex items-center gap-2" role="menubar">
          <li role="none">
            <NavLink to="/" className={linkClass} role="menuitem">
              Hoy
            </NavLink>
          </li>
          <li role="none">
            <NavLink to="/medicamentos" className={linkClass} role="menuitem">
              Medicamentos
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}