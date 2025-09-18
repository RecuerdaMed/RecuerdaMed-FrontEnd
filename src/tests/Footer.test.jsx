import { render, screen } from "@testing-library/react";
import Footer from "../components/common/Footer.jsx";

describe("Footer", () => {
  test("se renderiza el footer con role contentinfo", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  test("muestra el enlace de Contáctanos con href correcto", () => {
    render(<Footer />);
    const contactLink = screen.getByRole("link", { name: /contáctanos/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  test("muestra el enlace de Política de Privacidad con href correcto", () => {
    render(<Footer />);
    const privacyLink = screen.getByRole("link", { name: /política de privacidad/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  test("muestra el texto de derechos reservados", () => {
    render(<Footer />);
    const rightsText = screen.getByLabelText(/derechos reservados/i);
    expect(rightsText).toBeInTheDocument();
    expect(rightsText).toHaveTextContent(/© 2025/i);
  });
});
