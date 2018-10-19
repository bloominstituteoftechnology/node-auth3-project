import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavLink, Route} from 'react-router-dom';
import LogIn from './components/LogIn.js';
import Users from './components/Users.js';
import Register from './components/Register.js';

const Home = props => {
  return(
    <div>
      <h2>Hello</h2>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <nav>
          <NavLink to={'/'}>Home</NavLink>
          &nbsp; | &nbsp;
          <NavLink to={'/signup'}>Register</NavLink>
          &nbsp; | &nbsp;
          <NavLink to={'/signin'}>Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to={'/users'}>Users</NavLink>
          &nbsp; | &nbsp;
          <button onClick={this.signout}>Log Out</button>
          <br/>
          <Route exact path='/' component={Home} />
          <Route path='/signin' component={LogIn} />
          <Route path='/users' component={Users} />
          <Route path='/signup' component={Register} />
        </nav>
      </div>
    );
  }

  signout = () => {
    localStorage.removeItem('jwttoken');
  };
}


export default App;
