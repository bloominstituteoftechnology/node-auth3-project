import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./forms.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      department: "",
      registered: "false"
    };
  }

  handleSignup = e => {
    const endpoint = `${process.env.REACT_APP_API_URL}/register`;
    e.preventDefault();
    axios
      .post(endpoint, {
        username: this.state.username,
        password: this.state.password,
        department: this.state.department
      })
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        console.log("success", response.data.token);
        this.setState({
          registered: true
        });
      })
      .catch(err => console.log(err));
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const forward = this.state.registered;
    if (forward === true) {
      return <Redirect to="/signin" />;
    }

    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSignup}>
          <div>
            <label htmlFor="">Username: </label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="">Password: </label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              type="password"
            />
          </div>
          <div>
            <label htmlFor="">Department: </label>
            <input
              name="department"
              value={this.state.department}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
