import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  state = {
    username: "",
    department: "",
    password: ""
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignup}>
          <div>
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <label>Department</label>
            <input
              name="department"
              value={this.state.department}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSignup = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3300/api/register", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => console.log("Axios error", err));
  };
}

export default Signup;
