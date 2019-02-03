import React, { Component } from 'react';
import { Route, NavLink} from 'react-router-dom';
import './App.css';
import Signin from './authStuff/signin';
import Users from './authStuff/users';
// import Home from './authStuff/home';

class App extends Component {
  render() {
    return (
      <div className="App">
      <nav>
      <NavLink exact to="/">Home | </NavLink>
      <NavLink to="/users">See users | </NavLink>
      <NavLink to="/signin">Sign in</NavLink>
      </nav>

        <p>Some text goes here.</p>
        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
          {/* client side routes for
          - signup -- form gathering username, password, department -- post request to /api/register
          - sign in -- post request to login
          - show list of users 
          - button to sign out*/}

           {/* <Route path="/" Component={Home} /> */}
           {/* <Route path="/users" Component={Users} /> */}
      </div>
    );
  }
}

export default App;
