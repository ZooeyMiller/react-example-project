import React from "react";

const TEST_ID = "drake";
const Drake = ({ name, src, x, y, className = "" }) => (
  <img
    src={src}
    alt={name}
    style={{
      top: x,
      left: y
    }}
    className={`drake ${className}`}
    data-testid={TEST_ID}
  />
);

export { Drake as default, TEST_ID };
