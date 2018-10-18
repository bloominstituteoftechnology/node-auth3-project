import React, { Component } from "react";
import { Router, Link } from "react-router-dom";
import axios from "axios";

class SignUp extends Component {
  state = {
    username: "",
    department: "",
    password: ""
  };

  render() {
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.signUp}>
          <div>
            <label>Username:</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label>Department:</label>
            <input
              name="department"
              value={this.state.department}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
        <h3>
          {" "}
          Already registered? Sign in <Link to="/signin">here!</Link>
        </h3>
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  signUp = event => {
    event.preventDefault();

    axios
      .post("http://localhost:3300/api/register", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("Axios Error:", err);
      });
  };
}

export default SignUp;
