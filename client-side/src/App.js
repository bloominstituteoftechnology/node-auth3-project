import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import Users from './Components/Users';
import Signin from './Auth/Signin';

import './App.css';



const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  )
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <nav>
          <NavLink to='/' exact>
            Home
          </NavLink>
          &nbsp;|&nbsp;
          <NavLink to='/users'>
            Users
          </NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/login">Login</NavLink>
          &nbsp;|&nbsp;
          <button onClick={this.logout}>Signout</button>
        </nav>
        <main>
          <Route exact path = '/' component= {Home}></Route>
          <Route path = '/users' component= {Users}></Route>
          <Route path="/login" component={Signin} />
        </main>
        </header>
      </div>
    );
  }
  logout = () => {
    localStorage.removeItem('jwt');
  };
}

export default App;
