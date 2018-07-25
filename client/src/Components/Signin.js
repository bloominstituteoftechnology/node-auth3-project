import React, { Component } from "react";
import axios from "axios";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "shoron",
      password: "asdf"
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
              onChange={this.handleChange}
              id="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input
              type="password"
              value={this.state.password}
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
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5500/api/auth/login", this.state)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/users");
      })
      .catch(err => console.log(err));
  };
}

export default Signin;
