import React, { Fragment, Component } from 'react';
import { render } from 'react-dom';
import drakes from './drakes';

const randomWithin = within => Math.floor(Math.random() * within) + 1;

const Drake = ({ name, src, x, y, className = '' }) => (
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
  'drake-' +
  (index % 3 === 0 ? 'wiggle' : index % 2 === 0 ? 'wobble' : 'v-wiggle');

const Drakes = ({ drakes }) =>
  drakes.reduce(
    (acc, { name, src, x, y, display, className = '' }, i) =>
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

const DrakeButtons = ({ drakes, onClick }) => (
  <div className={'button-container'}>
    {drakes.map(drake => (
      <button onClick={onClick(drake)}>{drake.name}</button>
    ))}
  </div>
);

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

const BASE_URL = 'https://api.github.com';

const getUser = username => {
  const URL = `${BASE_URL}/users/${username}`;
  return fetch(URL).then(res => {
    if (res.status !== 200) {
      throw new Error('Non-200 API response');
    }
    return res.json();
  });
};

const AddDrake = props => (
  <form onSubmit={props.onSubmit}>
    <label htmlFor="add-drake">
      Add a Drake:
      <input
        id="add-drake"
        name="githubUsername"
        placeholder="github username..."
        onChange={props.onChange}
        value={props.name}
      />
    </label>
    <button>go</button>
  </form>
);

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
          className: ' userDrake',
          display: true
        };
        this.setState({
          drakes: [...this.state.drakes, userDrake],
          githubUsername: ''
        });
      })
      .catch(e => {
        alert(
          'sorry something went wrong probably a wrong github username or something idk'
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

render(<App />, document.getElementById('root'));
