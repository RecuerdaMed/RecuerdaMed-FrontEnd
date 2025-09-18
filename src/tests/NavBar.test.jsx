import { beforeEach, expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import NavBar from '../components/layout/NavBar.jsx'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

//testear navbar e hipervínculos
beforeEach(() => {
    render(
         <NavBar />
    )
})

test("renders navbar placeholder text", () => {
  render(<NavBar />);
  const text = screen.getByText(/hola, este es el navbar/i);
  expect(text).toBeInTheDocument();
});