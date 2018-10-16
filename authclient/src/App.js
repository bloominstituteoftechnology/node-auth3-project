import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Signin from './auth/Signin';
import Users from './users/Users';
import SignUp from './auth/SignUp';
import "./global.css";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Signin} />
        <Route exact path='/signup' component={SignUp} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}


export default withRouter(App);
