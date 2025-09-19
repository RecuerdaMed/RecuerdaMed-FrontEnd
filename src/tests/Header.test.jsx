import { render, screen } from "@testing-library/react";
import Header from "../components/common/Header.jsx";

describe("Header", () => {
  test("render the logo with the correct alt", () => {
    render(<Header />);
    const logo = screen.getByAltText(/sanitas/i);
    expect(logo).toBeInTheDocument();
  });

  test("The logo is inside a link to the main page.", () => {
    render(<Header />);
    const logo = screen.getByAltText(/sanitas/i);
    const link = logo.closest("a");
    expect(link).toHaveAttribute("href", "/");
  });

  test("The logo link has the correct aria-label.", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /página principal sanitas/i });
    expect(link).toBeInTheDocument();
  });
});
