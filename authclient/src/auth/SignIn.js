import React, { Component } from 'react';
import { Route } from 'react-router-dom'

class SignIn extends Component {
  render() {
    return (
      <div className="App">
      
        <form>
            Username <input type='text' />
            Password <input type='text' />
            <button type='submit'>Sign In</button>
        </form>

        
      </div>

    );
  }
}

export default SignIn;
