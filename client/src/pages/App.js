import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Landing from './landing/landing';
import Login from '../authentication/Login';
import SignUp from '../authentication/SignUp';
import Users from './users/users';

const App = () => (
  <Fragment>
    <Route exact path="/" component={Landing} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/users" component={Users} />
  </Fragment>
);

export default App;
