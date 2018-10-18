import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import Users from './users/Users.js';
import Signin from './auth/Signin';

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>Home</NavLink>
            &nbsp; |&nbsp; 
            <NavLink to="/users">Users</NavLink>
            &nbsp; |&nbsp; 
            <NavLink to="/signin">Signin</NavLink>
          </nav>
          <main>
            <Route exact path='/' component={Home} />
            <Route path='/users' component={Users} />
            <Route path='/signin' component={Signin} />
          </main>
        </header>
      </div>
    );
  }
}

export default App;
