import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';
import SignIn from './SignIn/index.js';
import SignUp from './SignUp/index.js';
import Users from './Users/index.js';

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
            <NavLink to='/' exact> Home</NavLink>&nbsp;&nbsp;&nbsp;
            <NavLink to='/SignUp'>Sign Up</NavLink>&nbsp;&nbsp;&nbsp;
            <NavLink to='/SignIn'>Sign In</NavLink>&nbsp;&nbsp;&nbsp;
            <NavLink to='/Users'>Users Page</NavLink>&nbsp;&nbsp;
            <button onClick={this.logout} onSubmit={this.SubmitHandler}>Sign Out</button>
          </nav>
        <main>
          <Route path='/' component={Home} exact></Route>
          <Route path='/SignUp' component={SignUp} exact></Route>
          <Route path='/SignIn' component={SignIn} exact></Route>
          <Route path='/Users' component={Users} exact></Route>
        </main>
        </header>
      </div>
    );
  }
}

export default App;
