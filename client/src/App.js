import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Signin from './Signin.js';
import Register from './Register.js';
import Users from './Users.js';

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
	<Route path='/signup' component={Register} />
	<Route path='/signin' component={Signin} />
	<Route path='/users' component={Users} />
        
      </div>
    );
  }

  //for signout, check for token and remove it before returning to signin
  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      this.props.history.push('/signin');
    }
  };
}

export default withRouter(App);
