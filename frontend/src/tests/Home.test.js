import React from "react";
import { render, screen } from "@testing-library/react";
import Hoverbar from "../Components/WelcomePage";

describe("Checking header", () => {
  test("Checking header", () => {
    render(<Hoverbar />);
    const text = screen.getByText(/Welcome To Etsy/i);
    expect(text);
  });
});
