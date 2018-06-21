import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import Register from './components/Register';
import Signin from './components/Signin';
import Users from './components/Users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
          <div>
            {localStorage.getItem('jwt') && (
              <button onClick={this.signout}>Signout</button>
            )}
          </div>
        </header>
        <p className="App-intro">
          <Route path = "/signup" component={Register} />
          <Route path = "/signin" component={Signin} />
          <Route path = "/users" component={Users} />
        </p>
      </div>
    );
  }
  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');

      this.props.history.push('/signin');
    }
  };
}

export default withRouter(App);
