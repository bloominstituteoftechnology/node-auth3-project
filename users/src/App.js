import React, { Component } from 'react';
import { Route,Link, withRouter } from "react-router-dom";

import './App.css';


import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Users from './components/users';

class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: false
    };
  }
  logOut = event => {
    localStorage.removeItem("jwt");
    this.props.history.push("/signIn");
  };
  render() {
    return (
      <div>
        <Link to="/signin">
          <button>Sign in page</button>{" "}
        </Link>
        <Link to="/signup">
          <button>Sign up page</button>{" "}
        </Link>
        <Link to="/users">
          <button>Users</button>{" "}
        </Link>
        <button onClick={this.logOut}>Log out</button>
        <h1>PICK AND CHOOSE</h1>
        <Route path="/signup" render={props => <SignUp {...props} />} />
        <Route path="/signin" render={props => <SignIn {...props} />} />
        <Route path="/users" render={props => <Users {...props} />} />
      </div>
    );
  }
}

export default withRouter(App);