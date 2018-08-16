import React, { Component } from "react";
import axios from "axios";

class Signin extends Component {
  state = {
    username: "John",
    password: ""
  };

  inputChangeHandler = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  submitHandler = event => {
    event.preventDefault();

    axios
      .post("http://localhost:3300/login", this.state)
      .then(res => {
        console.log("data", res.data);
      })
      .catch(err => {
        console.error("Axios failed");
      });

    console.log(this.state);
  };

  render() {
    return (
      <div className="Signin">
        <h1>Signin Component</h1>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              name="username"
              value={this.state.username}
              onChange={this.inputChangeHandler}
              type="text"
            />
          </div>
          <div>
            <input
              name="password"
              value={this.state.password}
              onChange={this.inputChangeHandler}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
