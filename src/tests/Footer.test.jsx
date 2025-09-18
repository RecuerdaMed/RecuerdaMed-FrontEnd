import { beforeEach, expect, test } from 'vitest'
import { render, screen, } from '@testing-library/react'
import Footer from '../components/layout/Footer.jsx'
import '@testing-library/jest-dom'

//testear footer 
beforeEach(() => {//Antes de cada test haz esto
    render(
         <Footer />  
    );
});

test("renders contact link in footer", () => {
  render(<Footer />);
  const link = screen.getByText(/contáctanos/i);
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "#");
});

test("renders copyright text", () => {
  render(<Footer />);
  const copyright = screen.getByText(/2025 sanitas/i);
  expect(copyright).toBeInTheDocument();
});