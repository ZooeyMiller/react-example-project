import { render, Simulate } from "react-testing-library";
import React from "react";
import DrakeButtons, { TEST_ID } from "./DrakeButtons";

// this stops Jest logging enormous red errors initially
// (because loads of variables in the React components are undefined)
beforeEach(() => {
  jest.spyOn(console, "error");
  console.error.mockImplementation(() => {});
});

test("DrakeButtons has the same amount of buttons as drakes passed in", () => {
  const { getByTestId } = render(
    <DrakeButtons drakes={[{ one: 1 }, { two: 2 }]} onClick={x => x} />
  );

  const { length } = getByTestId(TEST_ID).querySelectorAll("button");

  expect(length).toBe(2);
});
