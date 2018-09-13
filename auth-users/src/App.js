import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Users from './components/Users';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/users" component={Users} />
      </div>
    );
  }
  logoutHandler = e => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin')
  }
}

export default withRouter(App);
