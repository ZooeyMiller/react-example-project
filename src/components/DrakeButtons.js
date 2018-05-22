import React from "react";

const TEST_ID = "drake_buttons";

const DrakeButtons = ({ drakes, onClick }) => (
  <div className={"button-container"} data-testid={TEST_ID}>
    {drakes.map(drake => (
      <button onClick={onClick(drake)} key={drake.name}>
        {drake.name}
      </button>
    ))}
  </div>
);

export { DrakeButtons as default, TEST_ID };
