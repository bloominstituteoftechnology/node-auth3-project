import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "shoron",
      password: "asdf",
      race: "human"
    };
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={this.state.race}
            name="race"
            onChange={this.handleChange}
          />
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5500/api/auth/register", this.state)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  };
}

export default Register;
