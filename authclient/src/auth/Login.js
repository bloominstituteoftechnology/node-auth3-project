import React, { Component } from 'react';


class Login extends Component {
  render() {
    return (
      <form>
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    );
  }
}

export default Login;