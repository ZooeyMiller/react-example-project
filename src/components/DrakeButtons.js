import React from "react";

const DrakeButtons = ({ drakes, onClick }) => (
  <div className={"button-container"}>
    {drakes.map(drake => (
      <button onClick={onClick(drake)}>{drake.name}</button>
    ))}
  </div>
);

export default DrakeButtons;
