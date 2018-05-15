import React, { Fragment, Component } from "react";
import { render } from "react-dom";
import drakes from "./drakes";

const randomWithin = within => Math.floor(Math.random() * within) + 1;

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

const getAnimationClass = index =>
  "drake-" +
  (index % 3 === 0 ? "wiggle" : index % 2 === 0 ? "wobble" : "v-wiggle");

const Drakes = ({ drakes }) =>
  drakes.reduce(
    (acc, { name, src, x, y, display }, i) =>
      display
        ? [
            ...acc,
            <Drake
              src={src}
              name={name}
              x={x}
              y={y}
              key={name + x}
              className={getAnimationClass(i)}
            />,
            <Drake
              src={src}
              name={name}
              x={y - 75}
              y={x}
              key={name + y}
              className={getAnimationClass(i + 1)}
            />
          ]
        : acc,
    []
  );

const DrakeButtons = ({ drakes, onClick }) =>
  drakes.map(drake => <button onClick={onClick(drake)}>{drake.name}</button>);

const findDrakeIndex = (drakes, { name: nameToFind }) =>
  drakes.findIndex(({ name }) => name === nameToFind);

const toggleDrakeDisplay = (drakes, drakeToToggle) => {
  const index = findDrakeIndex(drakes, drakeToToggle);
  return [
    ...drakes.slice(0, index),
    { ...drakeToToggle, display: !drakeToToggle.display },
    ...drakes.slice(index + 1)
  ];
};

class App extends Component {
  state = { drakes, height: 600, width: 600 };

  handleDrakeClick = drake => () => {
    this.setState({
      drakes: toggleDrakeDisplay(this.state.drakes, drake)
    });
  };

  render() {
    return (
      <Fragment>
        <h1>fuckin yolo</h1>
        <div className="drake-container">
          <Drakes drakes={this.state.drakes} />
        </div>
        <DrakeButtons
          drakes={this.state.drakes}
          onClick={this.handleDrakeClick}
        />
      </Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
