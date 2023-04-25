import { render, screen } from "@testing-library/react";
import App from "./App";

describe("renders Search Page", () => {
  test("renders page title", () => {
    render(<App />);
    const element = screen.getByText(/Search results/i);
    expect(element).toBeInTheDocument();
  });

  test("render seearch input", () => {
    render(<App />);
    const element = screen.getByLabelText(/search by name or keyword/i);
    expect(element).toBeInTheDocument();
  });
});
