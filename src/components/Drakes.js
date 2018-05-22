import React from "react";

import Drake from "./Drake";

const getAnimationClass = index =>
  "drake-" +
  (index % 3 === 0 ? "wiggle" : index % 2 === 0 ? "wobble" : "v-wiggle");

const Drakes = ({ drakes }) =>
  drakes.reduce(
    (acc, { name, src, x, y, display, className = "" }, i) =>
      display
        ? [
            ...acc,
            <Drake
              src={src}
              name={name}
              x={x}
              y={y}
              key={name + x}
              className={getAnimationClass(i) + className}
            />,
            <Drake
              src={src}
              name={name}
              x={y - 75}
              y={x}
              key={name + y}
              className={getAnimationClass(i + 1) + className}
            />
          ]
        : acc,
    []
  );

export default Drakes;
