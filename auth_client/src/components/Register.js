import React, { Component } from 'react';

class Register extends Component {
  render() {
    return (
      <div>
        <h2>Please provide username and password</h2>
        <form>
          <input type="text" name="username" placeholder="username" />
          <br />
          <input type="password" name="password" placeholder="password" />
          <br />
          <input
            type="password"
            name="verify-password"
            placeholder="verify password"
          />
          <br />
          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
