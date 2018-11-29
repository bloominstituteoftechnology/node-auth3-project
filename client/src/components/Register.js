import React, { Component } from "react";
import axios from "axios";

const initialUser = {
  username: "",
  password: "",
  department: ""
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: ""
    };
  }

  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  submitHandler = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3300/api/register", this.state.user)
      .then(res => {
        if (res.status === 201) {
          this.setState({
            message: "Register Successful",
            user: { ...initialUser }
          });
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: "Register Unsuccessful",
          user: { ...initialUser }
        });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.inputHandler}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.inputHandler}
            required
          />
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={this.state.department}
            onChange={this.inputHandler}
            required
          />
          <button type="submit">Submit</button>
        </form>
        {this.state.message ? <h4>{this.state.message}</h4> : undefined}
      </div>
    );
  }
}
