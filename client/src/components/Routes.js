import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Users from './users/Users';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/users" component={Users} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </div>
    );
  }
}

export default Routes;
