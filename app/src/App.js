import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavLink, Route} from 'react-router-dom';
import LogIn from './components/LogIn.js';

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
          <NavLink to={'/login'}>Log In</NavLink>
          <br/>
          <Route exact path='/' component={Home} />

        </nav>
      </div>
    );
  }
}


export default App;
