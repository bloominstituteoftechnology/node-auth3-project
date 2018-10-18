import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = { username: "", password: "", department: "" };
  }
  componentDidMount() {}

  handleInput(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department
    };

    if (!user.username || !user.password) {
      //do nothing
      alert("Please fill out Register form!");
    } else {
      axios
        .post("http://localhost:9000/api/register", user)
        .then(response => {
          console.log(response.data);
          localStorage.setItem("jwt", response.data.token);
          this.props.history.push("/users");
        })
        .catch(err => console.log(err));

      this.setState({ username: "", password: "", department: "" });
    }
  }
  render() {
    return (
      <div className="login-form">
        <form>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Username"
            onChange={e => this.handleInput(e)}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleInput(e)}
            placeholder="Password"
          />
          <input
            type="text"
            name="department"
            value={this.state.department}
            placeholder="Department"
            onChange={e => this.handleInput(e)}
          />
          <button onClick={e => this.handleSubmit(e)}>Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
