import { render, Simulate } from "react-testing-library";
import React from "react";
import Drakes from "./Drakes";
import { TEST_ID } from "./Drake";

// this stops Jest logging enormous red errors initially
// (because loads of variables in the React components are undefined)
beforeEach(() => {
  jest.spyOn(console, "error");
  console.error.mockImplementation(() => {});
});

test("Drakes has 2 elements for each drake passed in", () => {
  const { container } = render(
    <Drakes drakes={[{ one: 1, display: true }, { two: 2, display: true }]} />
  );

  const { length } = container.querySelectorAll(`[data-testid=${TEST_ID}]`);

  expect(length).toBe(4);
});

test("Drakes only contains elements where display is true", () => {
  const { container } = render(
    <Drakes drakes={[{ one: 1, display: true }, { two: 2, display: false }]} />
  );

  const { length } = container.querySelectorAll(`[data-testid=${TEST_ID}]`);

  expect(length).toBe(2);
});
