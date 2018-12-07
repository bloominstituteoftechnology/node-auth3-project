import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Users from './users/users';
import Login from './auth/login';
import './App.css';


const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  )
}

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <nav>
          <NavLink to="/" exact>Home</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/users">Users</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/login">Login</NavLink>
          &nbsp; | &nbsp;
          <button onClick={this.logout}>Logout</button>
        </nav>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/login" component={Login} />
        </main>
        </header>
      </div>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');
  };
}


