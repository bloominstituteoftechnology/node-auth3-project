import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';

const Home = () => {
  return (
    <div>
      <h1>Authentication</h1>
      <div>
	<Route path = "" component={ Login }>Already registered? Sign in!</Route>
      </div>
      <div>
	<Route path = "" component={ Register }>New users register here</Route>
      </div>
    </div>
  );
};

export default Home;
