import { render, Simulate } from "react-testing-library";
import React from "react";
import Drake from "./Drake";

// this stops Jest logging enormous red errors initially
// (because loads of variables in the React components are undefined)
beforeEach(() => {
  jest.spyOn(console, "error");
  console.error.mockImplementation(() => {});
});

test("Drake should compose the className passed in", () => {
  const { getByAltText } = render(
    <Drake className="hello" name="best drake" />
  );
  const { className } = getByAltText("best drake");
  expect(className).toBe("drake hello");
});

test("className should default to an empty string", () => {
  const { getByAltText } = render(<Drake name="best drake" />);
  const { className } = getByAltText("best drake");
  expect(className).toBe("drake ");
});
