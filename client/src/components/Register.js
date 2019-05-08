import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Register extends Component {
  state = {
    username: "",
    password: "",
    department: "",
    registered: false
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const info = {
      username: this.state.username,
      department: this.state.department,
      password: this.state.password
    };

    axios
      .post("/register", info)
      .then(res => {
        this.setState({
          registered: true
        });
      })
      .catch(err => {
        console.error("REGISTER ERROR", err);
        this.setState({
          password: "",
          message: "Could not register"
        });
      });
  };

  render() {
    if (this.state.registered) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              message: "Registration successful, please log in."
            }
          }}
        />
      );
    }
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
              type="text"
              name="department"
              value={this.state.department}
              placeholder="Department"
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
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    );
  }
}
