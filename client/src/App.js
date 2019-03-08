import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Route, NavLink, withRouter} from 'react-router-dom';
import Login from './components/Login'
import Users from './components/Users'
import Signup from './components/Signup';
axios.defaults.withCredentials = true; 

class App extends Component {
  logout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/signin');
  };
  render() {
    return (
      <div className="App">
          <nav class="navbar">
            <NavLink to="/signin">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/users">Users</NavLink>
            <button onClick={this.logout}>Logout</button>
          </nav>
        <header className="App-header">
        <Route path="/users" render={(props) => <Users {...props}/>}/>
        <Route path="/signin" render={(props) => <Login {...props}/>}/>
        <Route path="/signup" render = {(props) => <Signup {...props}/>}/>
        </header>
      </div>
    );
  }
}

export default withRouter(App);