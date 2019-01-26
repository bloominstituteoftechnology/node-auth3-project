import React, { Component } from "react";
import axios from "axios";

const cl = console.log;

class Signin extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <form onSubmit={this.signin}>
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
          <button type="submit">Signin</button>
        </div>
      </form>
    );
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  signin = e => {
    e.preventDefault();

    axios
      .post("http://localhost:4142/api/login", this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token)
      })
      .catch(err => cl(err));
  };
}

export default Signin;
