import React, { useState, useEffect, Fragment } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import Landing from './landing/landing';
import Login from '../authentication/Login';
import SignUp from '../authentication/SignUp';
import Users from './users/users';

const App = props => {
  const [auth, setAuth] = useState(false);
  const [users, setUsers] = useState([]);

  const authenticate = async () => {
    const token = window.localStorage.getItem('jwt');
    console.log(token);
    if (token) {
      const options = { headers: { Authorization: token } };
      const res = await axios.get('api/users', options);
      if (res.status === 200) {
        setUsers(res.data);
        setAuth(true);
      } else setAuth(false);
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
        render={props => (auth ? <Redirect to="/users" /> : <Login {...props} />)}
      />
      <Route path="/signup" component={SignUp} />
      <Route
        path="/users"
        render={() => (auth ? <Users users={users} logout={setAuth} /> : <Redirect to="/" />)}
      />
    </Fragment>
  );
};

export default withRouter(App);
