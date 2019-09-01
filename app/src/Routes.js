import React from 'react';
import { Route } from 'react-router-dom';
import Users from './components/UsersComponents/Users';
import Register from './components/AuthComponents/Register';
import Login from './components/AuthComponents/Login';
import Home from './components/AuthComponents/Home';

const Routes = ({ api }) => {
  return (
    <>
      <Route exact path='/' render={props => <Home {...props} api={api} />} />
      <Route path='/login' render={props => <Login {...props} api={api} />} />
      <Route
        path='/register'
        render={props => <Register {...props} api={api} />}
      />
      <Route path='/users' render={props => <Users {...props} api={api} />} />
    </>
  );
};

export default Routes;
