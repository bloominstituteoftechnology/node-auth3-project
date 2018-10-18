import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    department: "",
    avatar: ""
  };

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
              placeholder="Username..."
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
              placeholder="Password..."
            />
          </div>
          <div>
            <label htmlFor="department">Department</label>
            <input
              name="department"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
              placeholder="Department..."
            />
          </div>
          <div>
            <label htmlFor="username">Avatar</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
              placeholder="URL for avatar..."
            />
          </div>
          <div>
            <button type="submit">Signup</button>
          </div>
        </form>
      </div>
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = "http://localhost:9001/api/register";
    console.log(this.state);
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  };
}

export default Signup;
