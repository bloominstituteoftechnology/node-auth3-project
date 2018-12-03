import React, { useState, useEffect, Fragment } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import Landing from './landing/landing';
import Login from '../authentication/Login';
import SignUp from '../authentication/SignUp';
import Users from './users/users';

const App = props => {
  const initialAuth = window.localStorage.getItem('auth') === 'false' ? false : true;
  const [auth, setAuth] = useState(initialAuth);
  const [users, setUsers] = useState([]);

  const authenticate = async () => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      const options = { headers: { Authorization: token } };
      try {
        const res = await axios.get('api/users', options);
        if (res.status === 200) {
          setUsers(res.data);
        }
      } catch {
        window.localStorage.removeItem('jwt');
        window.localStorage.setItem('auth', false);
        setUsers([]);
      }
    }
  };

  useEffect(
    () => {
      authenticate();
    },
    [props.location]
  );

  return (
    <Fragment>
      <Route exact path="/" render={() => (auth ? <Redirect to="/users" /> : <Landing />)} />
      <Route
        path="/login"
        render={props =>
          auth ? <Redirect to="/users" /> : <Login {...props} authorize={setAuth} />
        }
      />
      <Route path="/signup" component={SignUp} />
      <Route
        path="/users"
        render={props =>
          auth ? <Users {...props} users={users} unauthorize={setAuth} /> : <Redirect to="/" />
        }
      />
    </Fragment>
  );
};

export default withRouter(App);
