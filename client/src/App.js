import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Home from './components/Home';
import Users from './components/Users';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

class App extends Component {
  state = {
    login: false,
  };

  componentDidMount() {
    const tag = localStorage.getItem('jwt');
    console.log(tag);
    if (!!tag) {
      this.setState({ login: true });
    } else {
      this.setState({ login: false });
    }
  }

  logoutHandle = () => {
    localStorage.removeItem('jwt');
    document.location.reload();
  };

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          {this.state.login ? (
            <button onClick={this.logoutHandle}>Sign Out</button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/login" render={props => <Login {...props} />} />
          <Route path="/register" render={props => <Register {...props} />} />
        </main>
      </div>
    );
  }
}

export default App;
