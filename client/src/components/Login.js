import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" name="username" />
          <input type="password" name="password" />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;