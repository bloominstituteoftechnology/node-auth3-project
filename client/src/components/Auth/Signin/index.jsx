import React, { Component } from "react";
import axios from "axios";

class Signin extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <div>
        <h2>Sign In</h2>
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
            <button type="submit">Signin</button>
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

    // set endpoint const
    const endpoint = "http://localhost:9001/api/login";

    // post the state to the endpoint
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("error:", err);
      });
  };
}

export default Signin;
