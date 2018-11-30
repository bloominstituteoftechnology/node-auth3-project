import React, { Component } from "react";
import axios from "axios";

const endPoint = process.env.REACT_APP_API_URL;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`${endPoint}/api/login`, this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log(process.env.REACT_APP_API_URL);
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input name="username" type="text" value={this.state.username} onChange={this.changeHandler} />>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" value={this.state.password} onChange={this.changeHandler} />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    );
  }
}

export default Login;
