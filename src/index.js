import React, { Fragment, Component } from "react";
import { render } from "react-dom";
import drakes from "./drakes";
import Drakes from "./components/Drakes";
import AddDrake from "./components/AddDrake";
import DrakeButtons from "./components/DrakeButtons";

const randomWithin = within => Math.floor(Math.random() * within) + 1;

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

const BASE_URL = "https://api.github.com";

const getUser = username => {
  const URL = `${BASE_URL}/users/${username}`;
  return fetch(URL).then(res => {
    if (res.status !== 200) {
      throw new Error("Non-200 API response");
    }
    return res.json();
  });
};

class App extends Component {
  state = { drakes };

  handleDrakeClick = drake => () => {
    this.setState({
      drakes: toggleDrakeDisplay(this.state.drakes, drake)
    });
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    getUser(this.state.githubUsername)
      .then(({ login, avatar_url }) => {
        const userDrake = {
          name: login,
          src: avatar_url,
          x: randomWithin(600),
          y: randomWithin(600),
          className: " userDrake",
          display: true
        };
        this.setState({
          drakes: [...this.state.drakes, userDrake],
          githubUsername: ""
        });
      })
      .catch(e => {
        alert(
          "sorry something went wrong probably a wrong github username or something idk"
        );
      });
  };

  render() {
    return (
      <div class="page-container">
        <h1>fuckin yolo</h1>
        <AddDrake
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          name={this.state.githubUsername}
        />
        <div className="drake-container">
          <Drakes drakes={this.state.drakes} />
        </div>
        <DrakeButtons
          drakes={this.state.drakes}
          onClick={this.handleDrakeClick}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
