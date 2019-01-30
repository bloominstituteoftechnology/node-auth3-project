import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false
    };
  }

  signInUser = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:4200/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        console.log("token received");
        this.setState({
          loggedIn: true
        });
      })
      .catch(err => console.log(err));
    this.setState({
      username: "",
      password: ""
    });
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const redirectToUsers = this.state.loggedIn;
    if (redirectToUsers === true) {
      return <Redirect to="/users" />;
    }
    return (
      <div>
        <h2>Sign in!</h2>

        <form onSubmit={this.signInUser}>
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
          <button type="submit">Sign in!</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
