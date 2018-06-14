import React from "react";
import axios from "axios";

class Signin extends React.Component {
  state = {
    username: "",
    password: "",
    response: ""
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>username</label>
          <input
            value={this.state.race}
            name="username"
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
          <button type="submit">Signin</button>
        </div>
        <div>{this.state.response}</div>
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5500/api/auth/login", this.state)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        this.setState({ response: response.data.message });
      })
      .catch(err => console.log("oh no!"));
  };

  handleInput = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
}
export default Signin;
