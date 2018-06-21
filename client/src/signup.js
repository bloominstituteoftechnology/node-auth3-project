import React from "react";
import axios from "axios";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    race: "",
    response: ""
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>username</label>
          <input
            value={this.state.username}
            name="username"
            onChange={this.handleInput}
            type="text"
          />
        </div>
        <div>
          <label>race</label>
          <input
            value={this.state.race}
            name="race"
            onChange={this.handleInput}
            type="text"
          />
        </div>
        <div>
          <label>password</label>
          <input
            value={this.state.password}
            name="password"
            onChange={this.handleInput}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
        <div>{this.state.response}</div>
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5500/api/auth/register", this.state)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        this.setState({ response: "Welcome, " + response.data.username + "!" });
      })
      .catch(err => console.log(err));
  };

  handleInput = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
}
export default Signup;