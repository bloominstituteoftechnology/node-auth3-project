import React, { Component } from "react";
import axios from "axios";
export default class Signup extends Component {
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
      .post("http://localhost:9000/api/register", this.state)
      .then(res => this.props.getUsers(), this.props.history.push("/users"));
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
          <input
            type="text"
            placeholder="department"
            name="department"
            value={this.state.department}
            onChange={this.onChange}
          />
          <input type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
}
