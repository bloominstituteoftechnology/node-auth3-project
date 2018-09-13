import React, { Component } from "react";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  submitHandler = event => {
    event.preventDefault();
  };

handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value})
}

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label>
            Username:
            <input value={this.state.username} onChange = {this.handleChange} type="text" name="username" />
          </label>
          <label>
            Password:
            <input
              value={this.state.username} onChange = {this.handleChange}
              type="password"
              name="password"
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
