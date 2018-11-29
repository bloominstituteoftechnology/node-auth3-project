import React, { Component } from "react";
import axios from "axios";
export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      department: null
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    axios
      .post("http://localhost:9000/api/login", this.state)
      .then(
        res => localStorage.setItem("token", res.data.token),
        this.props.getUsers(),
        this.props.history.push("/users")
      );
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={this.state.name}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="password"
            name="password"
            value={this.state.name}
            onChange={this.onChange}
          />
          <input type="submit" value="Log in" />
        </form>
      </div>
    );
  }
}
