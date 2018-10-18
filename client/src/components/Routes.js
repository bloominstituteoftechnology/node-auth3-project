import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Users from './users/Users';
import Signin from './auth/Signin';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/users" component={Users} />
        <Route path="/signin" component={Signin} />
      </div>
    );
  }
}

export default Routes;
