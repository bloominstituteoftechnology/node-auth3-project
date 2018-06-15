import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
// import Login from './components/Login/Login';
import Register from './components/Register/Register';
// import Users from './components/Users/Users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
          <NavBar />
        </header>
        <div className="message">
          <h4>You must log in to your account to view all of our users. If you do not have an account please feel free to click on the register button to sign up. Thank you!</h4>
        </div>

        {/* <Route exact path='/login' component={Login} /> */}
        <Route exact path='/register' component={Register} />
        {/* <Route exact path='/users' component={Users} /> */}
      </div>
    );
  }
}

export default App;
