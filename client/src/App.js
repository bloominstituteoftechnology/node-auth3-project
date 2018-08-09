import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import SignIn from './auth/SignIn';
import Users from './users/Users';
import SignUp from './auth/SignUp';
import { Navigation } from './nav/Navigation';

class App extends Component {
  handleLogout = e => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        <Navigation handleLogout={this.handleLogout}/>

        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
