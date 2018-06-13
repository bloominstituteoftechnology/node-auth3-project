import React from 'react';
import { Route } from 'react-router-dom';
import loginRegister from './loginRegister.js';
import Userlist from '/Userlist.js';

const Home = () => {
  return (
    <div>
      <h1>Authentication</h1>
      <div>
	<Route path = '/signin' component={ loginRegister }>Already registered? Sign in!</Route>
      </div>
      <div>
	<Route path = '/signup' component={ loginRegister }>New users register here</Route>
      </div>
      <div>
	<Route path = '/users' component={ Userlist }>User List</Route>
      </div>
      
    </div>
  );
};

export default Home;
