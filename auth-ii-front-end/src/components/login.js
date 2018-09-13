import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <form onSubmit={this.login}>
        <div>
          <label>Username:</label>
          <input
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
            type="text"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            type="text"
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  login = event => {
    event.preventDefault();
    axios
      .post("http://localhost:2100/api/login", this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("Axios Error:", err);
      });
  };
}

export default Login;
