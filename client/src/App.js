import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, withRouter } from 'react-router'
import './App.css';

import Signin from './components/Signin'
import Users from './components/Users'
import Register from './components/Register'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          {localStorage.getItem('token') ? (
            <button onClick={this.signout}> Sign out </button>
          ) : <button onClick={() => this.props.history.push('/signup')}> Register </button>}
        </header>        
        <Route path="/signup" component={Register} />
        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
  signout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/signin')
    }
}


export default withRouter(App)
