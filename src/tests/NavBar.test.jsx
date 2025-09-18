
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/common/NavBar.jsx";

describe("NavBar", () => {
  test("renderiza todos los enlaces de navegación", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
     
    expect(screen.getByRole("link", { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /medicación/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /añadir/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /calendario/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ajustes/i })).toBeInTheDocument();
  });

  test("muestra el contador de medicamentos pendientes si pendingCount > 0", () => {
    render(
      <MemoryRouter>
        <NavBar pendingCount={3} />
      </MemoryRouter>
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("no muestra el contador si pendingCount = 0", () => {
    render(
      <MemoryRouter>
        <NavBar pendingCount={0} />
      </MemoryRouter>
    );

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  test("marca el enlace activo cuando la ruta coincide", () => {
    render(
      <MemoryRouter initialEntries={["/medications"]}>
        <NavBar />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /medicación/i });
    expect(link).toHaveClass("bg-[#295ADC] text-white");
  });
});
