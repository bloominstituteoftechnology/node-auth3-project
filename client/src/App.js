import React, { Component } from 'react';
import { withRouter, Route, NavLink } from 'react-router-dom';
import './App.css';

// import Routes
import SignUpPg from './components/SignUpPg';
import LogInPg from './components/LogInPg';
import UsersListPg from './components/UsersListPg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      usersList: []
    }
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/api/signup">Sign Up</NavLink>
          <NavLink to="/api/login">Log In</NavLink>
          <NavLink to="/api/users">Users List</NavLink>
        </nav>
        <div className="content">
          < Route path='/api/signup' component={SignUpPg} />
          < Route path='/api/login' component={LogInPg} />
          < Route path='/api/users' component={UsersListPg} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
