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
      <div className="Auth">
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/logout" render={this.logout} />
      </div>
    );
  }
};

export default AuthRouter;