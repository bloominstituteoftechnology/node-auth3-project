import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const endPoint = "http://localhost:4200/api/login";
    axios.get(endPoint).then(res => {
      console.log(res.data).catch(err => {
        console.log("Error", err);
      });
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" />>
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    );
  }
}

export default Login;
