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
        <form onSubmit={this.signin}>
          <div>
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Signin</button>
          </div>
        </form>
      </div>
    );
  } // end render

  // signin handler
  signin = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3300/api/login", this.state)
      .then(res => {
          console.log('Axios response', res)
          localStorage.setItem('jwt', res.data.token)
      })
      .catch(err => console.log('Axios error', err));
  };

  // input change handler
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
}

export default Signin;
