import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Signin from './auth/Signin';
import Users from './users/Users';

const Home = props => {
  return (
    <div>
       <h1>Hello</h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <nav>
                <NavLink to='/signout' exact>
                  Sign Up
                </NavLink>
                &nbsp;|&nbsp;
                <NavLink to='/' exact>
                  Home
                </NavLink>
                &nbsp;|&nbsp;
                <NavLink to='/signin' exact>
                  Sign In
                </NavLink>
                &nbsp;|&nbsp;
                <NavLink to='/users' exact>
                  Users
                </NavLink>
                &nbsp;|&nbsp;
                  <button onClick={this.signout}>Sign Out</button>
            </nav>
            <main>
              <Route path='/' component={Home} exact></Route>
              <Route path='/signin' component={Signin} exact></Route>
              <Route path='/users' component={Users} exact></Route>
              {/* <Route path='/' component={Home} exact></Route> */}
            </main>
        </header>
      </div>
    );
  }

  signout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
  }

}

export default App;
