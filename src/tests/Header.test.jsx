import { render, screen } from "@testing-library/react";
import { MemoryRouter} from "react-router-dom";
import '@testing-library/jest-dom';
import Header from "../components/layout/Header.jsx"; 

describe('Header Component', () => {
test("render the logo link to Dashboard", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
    const logoImg = screen.getByAltText(/sanitas logo/i);
    
    expect(logoImg).toBeInTheDocument();

    const link = logoImg.closest("a");

    expect(link).toHaveAttribute("href", "/");
});
});
