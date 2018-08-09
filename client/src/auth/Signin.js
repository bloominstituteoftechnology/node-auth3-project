import React, { Component } from "react";
import axios from "axios";

class Signin extends Component {
  state = {
    username: "",
    password: ""
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/login", this.state)
      .then(response => {
        const token = response.data;
        localStorage.setItem("jwt", token);
        console.log(response.data);
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div className="Signin">
        <h1>Signin</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" />
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <button type="submit">Signin</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
