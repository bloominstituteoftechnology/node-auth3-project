import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from './Login';

class AuthRouter extends React.Component {

  logout = () => {
    localStorage.clear();
    return <Redirect to="/" />
  }

  render() {
    return (
      <>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/logout" render={this.logout} />
      </>
    );
  }
};

export default AuthRouter;