import React, { Component } from 'react';
import { Route } from 'react-router-dom'

class SignIn extends Component {
  render() {
    return (
      <div className="App">
        <form>
            Username <input type='text'> </input>
            Password <input type='text'> </input>
            <input type='submit'>Sign In</input>
        </form>

        
      </div>

    );
  }
}

export default SignIn;
