import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  signUp = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const info = { username, password };
    axios
      .post(`http://localhost:8000/api/register`, info)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
      })
      .catch(error => console.error("Error:", error));

    this.setState({
      username: "",
      password: ""
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.Signup}>
          <input
            onChange={this.handleInputChange}
            placeholder="username"
            value={this.state.username}
            name="username"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="password"
            value={this.state.password}
            name="password"
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
