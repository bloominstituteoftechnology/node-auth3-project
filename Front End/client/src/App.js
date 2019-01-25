import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './App.css';
import { Route } from 'react-router-dom';
import SignUp from './Components/Signup';
import SignIn from './Components/Signin';
import Users from './Components/Users';
class App extends Component {
  render() {
    return (
      <div >
        <header >
          <NavLink className="links"  to={'/signup'}>Signup</NavLink>
          <NavLink className="links" to={'/signin'}>Signin</NavLink>
          <NavLink className="links" to={'/users'}>User Database</NavLink>
        </header>
        <h1>Welcome to User Database</h1>
        <div >
          <Route path="/signup" render={(props) => <SignUp {...props} />} />
          <Route path="/signin" render={(props) => <SignIn {...props} />} />
          <Route path="/users" render={(props) => <Users {...props} />} />
        </div>
      </div>
    );
  }
}

export default App;
