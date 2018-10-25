import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import Users from './users/Users';
import Login from './auth/Login';

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
            <NavLink exact to='/'>Home</NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/users'>Users</NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/login'>Login</NavLink>
          </nav>
          <main>
            <Route exact path='/' component={Home} />
            <Route path='/users' component={Users} />
            <Route path='/login' component={Login} />
          </main>
        </header>
      </div>
    );
  }
}

export default App;