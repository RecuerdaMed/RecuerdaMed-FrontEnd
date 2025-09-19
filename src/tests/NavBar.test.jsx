import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/common/NavBar.jsx";

describe("NavBar", () => {
  test("renders the Today and Medications links", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByRole("menuitem", { name: /hoy/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /medicamentos/i })).toBeInTheDocument();
  });

  test("marks the active link when the route is '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <NavBar />
      </MemoryRouter>
    );

    const link = screen.getByRole("menuitem", { name: /hoy/i });
    expect(link).toHaveClass("bg-[#295ADC] text-white");
  });

  test("marks the active link when the path is '/medicines'", () => {
    render(
      <MemoryRouter initialEntries={["/medicamentos"]}>
        <NavBar />
      </MemoryRouter>
    );

    const link = screen.getByRole("menuitem", { name: /medicamentos/i });
    expect(link).toHaveClass("bg-[#295ADC] text-white");
  });
});
