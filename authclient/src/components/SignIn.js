import React, { Component } from "react";
import { Router, Link } from "react-router-dom";
import axios from "axios";

class SignIn extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.signIn}>
          <div>
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
        <h3>
          {" "}
          Not a registered user? Sign up <Link to="/signup">here!</Link>
        </h3>
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  signIn = event => {
    event.preventDefault();

    axios
      .post("http://localhost:3300/api/login", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("Axios Error:", err);
      });
  };
}

export default SignIn;
