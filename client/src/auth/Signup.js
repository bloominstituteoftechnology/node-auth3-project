import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    dept: ""
  };

  render() {
    return (
      <form onSubmit={this.signup}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <div>
          <label>Department</label>
          <input
            name="dept"
            value={this.state.dept}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    );
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  signup = event => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/register", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        // navigate to /users
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("Axios Error:", err);
      });
  };
}

export default Signup;
