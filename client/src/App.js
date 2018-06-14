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
          <h1 className="App-title">Fellowship of the JWTs</h1>
          <img src="https://pre00.deviantart.net/104f/th/pre/i/2013/353/3/a/lord_of_the_rings_logo_by_haleyhss-d6yi9hz.png" className="App-logo" alt="logo" />

          <Link to='/' className="home">Home</Link>

          <div className="signout">
            {localStorage.getItem('jwt') && (
              <button onClick={this.signout}>Signout</button>
            )}
          </div>
        </header>
        <div className="app-body">
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
      </div>
    );
  }
}

export default withRouter(App);
