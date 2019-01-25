import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
// import { Button } from 'reactstrap';

import './App.css';

import Home from './Home';
import Users from './users/Users';
import Signup from './auth/Signup'
import Signin from './auth/Signin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink exact to='/'>
            Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink exact to='/signup'>
            Sign Up
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/signin'>
            Sign In
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/users'>
            Users
            </NavLink>
            {/* &nbsp;|&nbsp;
            <Button color='warning' onClick={this.signout}>Sign Out</Button> */}
          </nav>
          <main>
            <Route path='/' component={Home} exact></Route>
            <Route path='/signup' component={Signup} exact></Route>
            <Route path='/signin' component={Signin} exact></Route>
            <Route path='/users' component={Users} exact></Route>
          </main>
        </header>
      </div>
    );
  }

  // signout = () => {
  //   localStorage.removeItem('jwt');
  // }
}

export default App;