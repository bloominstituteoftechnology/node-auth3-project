import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  addLogin = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitLogin = event => {
    event.preventDefault();
    const loginUser = { username: this.state.username, password: this.state.password };
    axios
      .post("http://localhost:8000/api/login", loginUser)
      .then(response => {
        localStorage.setItem("jwt", response.data);
        this.props.history.push("/users");
      })
      .catch(err => {
        alert("Invalid Username or Password");
      });
  };
  render() {
    return (
      <form>
        <h2>Log In to See List of Users</h2>
        <input
          onChange={this.addLogin}
          type="text"
          name="username"
          placeholder="Enter your Username"
        />
        <input
          onChange={this.addLogin}
          type="password"
          name="password"
          placeholder="Enter your Password"
        />
        <button onClick={this.submitLogin}>Log In</button>
        <hr />
        <p>No account yet? Please register.</p>
        <Link to="/signup">
          <button>Register</button>
        </Link>
      </form>
    );
  }
}

export default Signin;
