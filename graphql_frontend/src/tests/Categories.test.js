import React from "react";
import { render, screen } from "@testing-library/react";
import Hoverbar from "../Components/HoverBoard";

describe("Checking header", () => {
  test("Checking header", () => {
    render(<Hoverbar />);
    const text = screen.getByText(/Jewelry & Accessories/i);
    expect(text);
  });
});
