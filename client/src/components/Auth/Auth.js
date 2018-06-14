import React from 'react';
import { Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  return (
    <React.Fragment>
      {localStorage.getItem('jwt') && (
        <Link to="/register">
          <button onClick={logOut}>Log out</button>
        </Link>
      )}
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </React.Fragment>
  );
};

const logOut = () => {
  localStorage.removeItem('jwt');
  !localStorage.getItem('jwt') ? console.log('logged out') : null;
};

export default Auth;
