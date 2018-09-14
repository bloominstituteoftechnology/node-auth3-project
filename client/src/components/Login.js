import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };


  handleChange = event => {
//grabs name and value from event.target from our inputs
    const { name, value } = event.target;
//sets our state value to whatever value is in the form
//name = username or password
//value is whatever is input in the form
    this.setState({ [name]: value });
  };

  submitHandler = event => {
//when submit is pressed this will prevent page refresh
    event.preventDefault();
//this will post whatever is in state to the database at the url
    axios
      .post("http://localhost:8000/users/login", this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token)
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label>
            Username:
            <input
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              name="username"
            />
          </label>
          <label>
            Password:
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
