import React from "react";

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

export default AddDrake;
