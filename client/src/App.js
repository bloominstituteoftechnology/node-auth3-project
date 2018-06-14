import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Signin from './auth/Signin';
import Users from './users/Users';
import Signup from './auth/Signup';

class App extends Component {

  signout = () => {
    if(localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      this.props.history.push('/');
    }
  };

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
        
        { this.props.location.pathname === "/" && (
          <div className="links">
            <Link to='/signin' className="link">Sign In</Link>
            <Link to='/signup' className="link">Sign Up</Link>
          </div>)
        }
          

        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
      </div>
    );
  }
}

export default withRouter(App);
