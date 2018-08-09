import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Users from './components/Users';

class App extends Component {
  logoutHandler = e => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    this.props.history.push('/api/login');
  }

  render() {
    return (
      <div>
        <button onClick={this.logoutHandler}>Log out</button>
        <Route path="/api/register" component={SignUp} />
        <Route path="/api/login" component={SignIn} />
        <Route path="/api/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
