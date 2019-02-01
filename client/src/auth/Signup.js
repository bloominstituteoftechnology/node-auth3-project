import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      department: ""
    };
  }
  handleRegister = event => {
    event.preventDefault();
    const endpoint = "http://localhost:3300/api/register";

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt",res.data.token)
        this.props.history.push("/users");
        alert("Congrats You Signed Up");
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, department } = this.state;
    return (
      <form onSubmit={this.handleRegister}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            onChange={this.handleInput}
            name="username"
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            onChange={this.handleInput}
            name="password"
            value={password}
          />
        </div>
        <div>
          <label htmlFor="department">Department: </label>
          <input
            type="text"
            onChange={this.handleInput}
            name="department"
            value={department}
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    );
  }
}

export default Signup;
