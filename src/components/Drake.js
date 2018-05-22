import React from "react";

const Drake = ({ name, src, x, y, className = "" }) => (
  <img
    src={src}
    alt={name}
    style={{
      top: x,
      left: y
    }}
    className={`drake ${className}`}
  />
);

export default Drake;
