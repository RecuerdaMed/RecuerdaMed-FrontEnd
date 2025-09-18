import { render, screen } from "@testing-library/react";
import Header from "../components/common/Header.jsx";

describe("Header", () => {
  test("renderiza el logo con el alt correcto", () => {
    render(<Header />);
    const logo = screen.getByAltText(/sanitas/i);
    expect(logo).toBeInTheDocument();
  });

  test("el logo está dentro de un enlace a la página principal", () => {
    render(<Header />);
    const logo = screen.getByAltText(/sanitas/i);
    const link = logo.closest("a");
    expect(link).toHaveAttribute("href", "/");
  });

});
