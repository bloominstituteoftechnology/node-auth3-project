import React, { Component } from 'react';
import axios from 'axios';



class Login extends Component {
  render() {
    return (
     <form>
      <div>
        <label htmlFor="username">Username</label>
        <input></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input></input>
      </div>
      <div>
        <button type="submit">Sign in
        </button>
      </div>
     </form>
    );
  }
  
}

export default Login;