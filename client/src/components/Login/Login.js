import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  submitHandler = event => {
    event.preventDefault();

    axios
      .post("http://localhost:5500/api/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        localStorage.setItem("jwt", response.data);
        this.props.history.push("/");
      })
      .catch(err => {
        alert(err.response.data);
      });
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleOnChange}
            required
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            minLength="12"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleOnChange}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}


export default withRouter(Login);