import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

import "./forms.css";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    registered: false
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = `${process.env.REACT_APP_API_URL}/login`;

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.setState({
          registered: true
        });

        console.log("response", res.data.token);
      })
      .catch(err => console.log(err));
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const forwardToUsers = this.state.registered;
    if (forwardToUsers === true) {
      return <Redirect to="/users" />;
    }
    return (
      <div>
        <h2>Welcome! Sign in!</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="">Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
