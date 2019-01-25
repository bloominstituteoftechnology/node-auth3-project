import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import './App.css';

import Users from './users/Users';
import Signin from './auth/Signin';

class App extends Component {
  render() {
    return(
      <div>
        <header>
          <nav>
            <NavLink to = '/signin'>Sign-In</NavLink>
            <NavLink to = '/users'>Users</NavLink>

            <button onClick={this.signout}>Sign Out</button>
          </nav>
        </header>
        <main>
          <Route path='/signin' component={Signin}/>

          <Route path='/users' component={Users}/>
        </main>
      </div>
    );
}

signout = () => {
  localStorage.removeItem('jwt');
}

}

export default App;
