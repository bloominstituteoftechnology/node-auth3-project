import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import './App.css';
import Users from './Components/Users';
import Auth from './Components/Auth';

const Home = props => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink className='menu-link' to='/' exact>
              Home
            </NavLink>

            <NavLink className='menu-link' to='/signin'>
              Sign In
            </NavLink>
            
            <NavLink className='menu-link' to= '/users'>
              Users
            </NavLink>
          </nav>
          <main>
            <Route path='/' component={Home} exact></Route>
            <Route path='/signin' component={Auth} exact></Route>
            <Route path='/users' component={Users} exact></Route>
          </main>
        </header>
      </div>
    );
  }
}
export default App;
