import React, { Component } from 'react';
import logo from './logo.svg';
import { NavLink, Route } from 'react-router-dom';
import './App.css';
import Users from './users/Users';
import Login from './auth/Login';
import Signup from './auth/Signup';

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  )
}

class App extends Component {
  signout = () => {
  
    localStorage.removeItem('jwt');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <nav className = 'nav-links'>
              <NavLink to= "/" exact>Home</NavLink>
              &nbsp; | &nbsp;
              <NavLink to= "/users" >Users</NavLink>
              &nbsp; | &nbsp;
              <NavLink to= "/signin" >Log In</NavLink>
              &nbsp; | &nbsp;
              <NavLink to= "/signup" >Register</NavLink>
              &nbsp; | &nbsp;
              <button onClick={this.signout}>Sign Out</button>
            </nav>
            <main>
              <Route path = "/" component={ Home } exact/>
              <Route path = "/users" component={ Users }/>
              <Route path = "/signin" component={ Login }/>
              <Route path = "/signup" component={ Signup }/>
            </main>
        </header>
      </div>
    );
  }
}



export default App;
