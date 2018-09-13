import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  render() {
    return (
      <form onSubmit={this.register}>
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
          <label>Department:</label>
          <input
            name="department"
            onChange={this.handleChange}
            value={this.state.department}
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

  register = event => {
    event.preventDefault();
    axios
      .post("http://localhost:2100/api/register", this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err => {
        console.error("Axios Error:", err);
      });
  };
}

export default Register;
