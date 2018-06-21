import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';

import './App.css';
import Signin from './signin.js';
import Users from './users.js';
import Signup from './signup.js';

class App extends Component {
  
  render() {

    return (
      <div className="App">
 
        
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
          <Link to="/users">
            <button>Current Users</button>
          </Link>
          <Link onClick={this.signout} to="/signout">
            <button>Sign Out</button>
          </Link>
        
        
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/users" component={Users} />
      </div>
    );
  }

  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');

      this.props.history.push('/signin');
    }
  };
}

export default App;
