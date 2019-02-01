import React, { Component } from "react";
import axios from "axios";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = "http://localhost:3300/api/login";

    const login = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post(endpoint, login)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push('/users')
        this.setState({
          username:'',
          password:''
        })
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  };

  inputHandler = event => {
    const { name, value} = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={this.inputHandler}
            name="username"
            value={this.state.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={this.inputHandler}
            name="password"
            value={this.state.password}
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    );
  }
}

export default Signin;
