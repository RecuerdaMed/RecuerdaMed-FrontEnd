import { render, screen } from "@testing-library/react";
import Footer from "../components/common/Footer.jsx";

describe("Footer", () => {
  test("The footer is rendered with the contentinfo role.", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  test("displays the Contact Us link with the correct href", () => {
    render(<Footer />);
    const contactLink = screen.getByRole("link", { name: /contáctanos/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  test("Displays the Privacy Policy link with the correct href", () => {
    render(<Footer />);
    const privacyLink = screen.getByRole("link", { name: /política de privacidad/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  test("displays the copyright text with the year 2025", () => {
    render(<Footer />);
    const rightsText = screen.getByLabelText(/derechos reservados/i);
    expect(rightsText).toBeInTheDocument();
    expect(rightsText).toHaveTextContent(/© 2025/i);
  });
});
