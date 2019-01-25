import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

// Includes for Routes
import Signin from './auth/Signin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to='/' exact>Home</NavLink> | 
            <NavLink to='/signin'>Log In</NavLink> | 
            <NavLink to='/users'>Users</NavLink> |
            <NavLink to='/signout'>Log Out</NavLink>
          </nav>
          <main>
            <Route path='/' exact></Route>
            <Route path='/signin' component={Signin} exact></Route>
          </main>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
