import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    message: ""
  };

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.message) {
      this.setState({
        message: this.props.location.state.message
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const info = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post("/login", info)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("LOGIN ERROR", err);
        this.setState({
          password: "",
          message: "Invalid credentials"
        });
      });
  };

  render() {
    return (
      <div>
        {this.state.message}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    );
  }
}
