import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Signin from './auth/Signin';
import Users from './users/Users';
import SignUp from './auth/SignUp';

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/signin' component={Signin} />
        <Route path='/users' component={Users} />
        <Route exact path='/' component={SignUp} />
      </div>
    );
  }
}


export default withRouter(App);
