import React, { Component } from 'react';
import logo from './logo.svg';
import { NavLink, Route } from 'react-router-dom';
import './App.css';
import Users from './users/Users';

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <nav className = 'nav-links'>
              <NavLink to= "/" exact>Home</NavLink>
              &nbsp; | &nbsp;
              <NavLink to= "/users" >Users</NavLink>
            </nav>
            <main>
              <Route path = "/" component={ Home } exact/>
              <Route path = "/users" component={ Users }/>
            </main>
        </header>
      </div>
    );
  }
}

export default App;
