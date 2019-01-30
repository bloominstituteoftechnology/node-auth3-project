import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      department: "",
      registered: false
    };
  }

  registerNewUser = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:4200/register`, {
        username: this.state.username,
        password: this.state.password,
        department: this.state.department
      })
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        console.log("signin in", response.data);
        this.setState({
          registered: true
        });
      })
      .catch(err => console.log(err));
    this.setState({
      username: "",
      password: "",
      department: ""
    });
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const redirectToUsers = this.state.registered;
    if (redirectToUsers === true) {
      return <Redirect to="/signin" />;
    }
    return (
      <div>
        <h2>Sign up!</h2>
        <form onSubmit={this.registerNewUser}>
          <div>
            <input
              onChange={this.handleInput}
              placeholder="Username"
              value={this.state.username}
              name="username"
            />
          </div>
          <div>
            <input
              onChange={this.handleInput}
              placeholder="Password"
              value={this.state.password}
              name="password"
            />
          </div>
          <div>
            <input
              onChange={this.handleInput}
              placeholder="department"
              value={this.state.department}
              name="department"
            />
          </div>
          <button type="submit">Sign up!</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
