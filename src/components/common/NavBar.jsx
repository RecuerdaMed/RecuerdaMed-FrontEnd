import { NavLink } from "react-router-dom";

export default function NavBar({ pendingCount = 0 }) {
  const base = "px-4 py-3 rounded-lg text-base font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#295ADC]";
  const active = "bg-[#295ADC] text-white";
  const inactive = "text-gray-900 hover:bg-blue-50";

  return (
    <nav
      className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200"
      role="navigation"
      aria-label="Navegación principal"
    >
      <ul className="flex justify-center gap-3 md:gap-6 py-2 md:py-3">
        <li>
          <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/medications" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
            Medicación
            {pendingCount > 0 && (
              <span className="ml-2 inline-flex min-w-6 h-6 px-2 items-center justify-center rounded-full bg-red-600 text-white text-xs">
                {pendingCount}
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-drug" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
            Añadir
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
            Calendario
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
            Ajustes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
