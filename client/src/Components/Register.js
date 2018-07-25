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
          <div>
            <label htmlFor="username">Username </label>
            <input
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
              id="username"
            />
          </div>
          <div>
            <label htmlFor="race">Race </label>
            <input
              type="text"
              value={this.state.race}
              name="race"
              onChange={this.handleChange}
              id="race"
            />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
              id="password"
            />
          </div>
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
        this.props.history.push("/signin");
        console.log(response);
        //I did not set the token in local storage here to force user to login.
      })
      .catch(err => console.log(err));
  };
}

export default Register;
