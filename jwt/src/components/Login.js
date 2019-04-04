import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleLogin = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3800/api/login", this.state)
      .then(res => localStorage.setItem("token", res.data.token))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form>
        <input
          type="text"
          name="username"
          onChange={this.changeHandler}
          placeholder="username"
          required
        />
        <input
          type="password"
          name="password"
          onChange={this.changeHandler}
          placeholder="password"
          required
        />
        <button onClick={e => this.handleLogin(e)}>Sign in</button>
      </form>
    );
  }
}

export default Login;
