import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import SignUp from './SignUp';
import Users from './Users';

const Home = props => {
  return (
    <div>
      <h3>... You're still here?  It's over.  Go home.  Go - Ferris Bueller</h3>
    </div>
  )
}

class App extends Component {
  logout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();

  }

  SubmitHandler = (event) => {
    event.preventDefault();
    this.setState();

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to='/' exact> Home</NavLink>
            <NavLink to='/SignUp'> Sign Up </NavLink>
            <NavLink to='/Users'>Users Page </NavLink>
            <button onClick={this.logout} onSubmit={this.SubmitHandler}> Sign Out </button>
          </nav>
        </header>
        <main>
          <Route path='/' component={Home} exact></Route>
          <Route path='/SignUp' component={SignUp} exact></Route>
          <Route path='/Users' component={Users} exact></Route>
        </main>
      </div>
    );
  }
}

export default App;
