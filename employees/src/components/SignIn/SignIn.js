import React, { Component } from 'react';

class SignIn extends Component {
    render() {
        return (
          <div>
            <h1>Sign In</h1>
            <form action="" method='POST'>
              <input placeholder='username' type="text"/>
              <input placeholder='password' type="text"/>
              <button type='button'>submit</button>
            </form>
          </div>
        );
    }
}

export default SignIn;
