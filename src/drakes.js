import differentDrake from "./assets/different-drake.png";
import creepyDrake from "./assets/drake-creepy.png";
import happyDrake from "./assets/happy-drake.png";
import happyDrakeTwo from "./assets/happy-drake-2.png";
import idkDrake from "./assets/idk-drake.png";

const camelCaseToSpaces = string =>
  string
    .split("")
    .reduce(
      (acc, el) => acc + (el === el.toUpperCase() ? ` ${el.toLowerCase()}` : el)
    );

const drakes = [
  ["differentDrake", differentDrake, 50, 200],
  ["creepyDrake", creepyDrake, 250, 500],
  ["happyDrake", happyDrake, 200, 320],
  ["happyDrakeTwo", happyDrakeTwo, 100, 500],
  ["idkDrake", idkDrake, 500, 100]
].map(([name, src, x, y]) => ({
  name: camelCaseToSpaces(name),
  src,
  x,
  y,
  display: false
}));

export default drakes;
