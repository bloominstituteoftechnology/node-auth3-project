import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Signin from './auth/Signin'
import Users from './Users/Users'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">It's Alive!!</p>
        <div><button onClick={this.logoutHandler}>Logout</button></div>

        <Route path='/signin' component={Signin} />
        <Route path='/users' component={Users} />

      </div>
    );
  }

  logoutHandler = (e) => {
    localStorage.removeItem('jwt')

    this.props.history.push('/signin')
  }
}

export default withRouter(App);
