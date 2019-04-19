import React, { Component } from'react';
import {Route, NavLink, withRouter } from'react-router-dom';
import Login from './login/login';
import Users from './users/users'
import Register from './register/register'
import './App.css';

class App extends Component {
  render() {
    return (
      <>
    <header>
    <nav>
    <NavLink to="/register">Signup</NavLink>
    &nbsp; | &nbsp;
    <NavLink to="/login">Signin</NavLink>
    &nbsp; | &nbsp;
    <NavLink to="/Users">Users</NavLink>
    &nbsp; | &nbsp;
    <button onClick={this.logout}>Logout</button>
    </nav>
    </header>
    <main>
    <Route path="/register" component={Register}/>
    <Route path="/login" component={Login}/>
    <Route path="/users" component={Users}/>

    </main>
    </>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');
    this.props.history.push('/login');
  }
}

export default withRouter(App);
