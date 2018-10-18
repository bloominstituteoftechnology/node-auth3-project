import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    department: "user",
    avatar: "",
    email: ""
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
            <select name="department" onChange={this.handleInputChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="dba">DBA</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              type="text"
              placeholder="Email..."
            />
          </div>{" "}
          <div>
            <label htmlFor="avatar">Avatar</label>
            <input
              name="avatar"
              value={this.state.avatar}
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
    // pull out the name and value from the event target
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // set the endpoint const
    const endpoint = "http://localhost:9001/api/register";

    // post the state to the endpoint
    axios
      .post(endpoint, this.state)
      .then(res => {
        // set the jwt in to the local storage
        localStorage.setItem("jwt", res.data.token);
        // redirect to the users route
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("error:", err);
      });
  };
}

export default Signup;
