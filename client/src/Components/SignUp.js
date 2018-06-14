import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      race: ""
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitInputChange = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5500/api/auth/register", this.state)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        this.props.history.push("/users");
      })
      .catch(err => err.message);
  };

  render() {
    return (
      <form onSubmit={this.submitInputChange}>
        <div>
          <label>Username</label>
          <input
            value={this.state.username}
            onChange={this.handleInputChange}
            placeholder="username"
            name="username"
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.handleInputChange}
            placeholder="password"
            name="password"
            type="password"
          />
        </div>
        <div>
          <label>Race</label>
          <input
            value={this.state.race}
            onChange={this.handleInputChange}
            placeholder="race"
            name="race"
            type="text"
          />
        </div>
        <div>
          <button type="submit">Signin</button>
        </div>
      </form>
    );
  }
}

export default SignUp;
