import React, { Component } from 'react';

class SignIn extends Component {
  render() {
    return (
      <div>
        <h2>Please Sign In</h2>
        <form>
          <input type="text" name="username" placeholder="username" />
          <br />
          <input type="password" name="password" placeholder="password" />
          <br />
          <button>Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
