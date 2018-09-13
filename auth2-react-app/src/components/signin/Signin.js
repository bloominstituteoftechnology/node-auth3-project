import React, { Component } from "react";
import axios from "axios";

export class Signin extends Component {
  state = {
    username: "",
    password: "",
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  signinHandler = event => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/login", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => console.log("AXIOS ERR", err));
  };
  render() {
    return (
      <form onSubmit={this.signinHandler}>
        <label>Username</label>
        <input
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          type="text"
        />
        <label>Password</label>
        <input
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          type="password"
        />
        <button type="submit">Sign In</button>
      </form>
    );
  }
}
