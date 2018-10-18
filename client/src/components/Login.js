import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = { username: "", password: "" };
  }
  componentDidMount() {}

  handleInput(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(user);
    axios
      .post("http://localhost:9000/api/login", user)
      .then(response => {
        console.log(response.data);
        localStorage.setItem("jwt", response.data.token);
        this.props.history.push("/users");
      })
      .catch(err => console.log(err));

    this.setState({ username: "", password: "" });
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
          <button onClick={e => this.handleSubmit(e)}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
