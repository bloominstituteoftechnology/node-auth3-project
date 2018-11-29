import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const url = "http://localhost:8080/api/register";
    console.log("state", this.state);
    axios
      .post(url, this.state)
      .then(res => {
        console.log("res data", res.data);
        this.setState({ ...this.state });
      })
      .catch(err => {
        this.setState({
          username: "",
          password: "",
          department: ""
        });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
          />
          <label htmlFor="password">Department</label>
          <input
            name="department"
            value={this.state.department}
            onChange={this.handleInputChange}
            type="text"
          />
          <button type="submit">Log in</button>
        </div>
      </form>
    );
  }
}

export default Register;
