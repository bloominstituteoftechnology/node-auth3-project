import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  return (
    <React.Fragment>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </React.Fragment>
  );
};

export default Auth;
