import React, { Component } from "react";

class SignIn extends Component {
  render() {
    return (
      <form>
        <div>
          <label>Username</label>
          <input type="text" />
        </div>
        <div>
          <label>Password</label>
          <input type="text" />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    );
  }
}

export default SignIn;
