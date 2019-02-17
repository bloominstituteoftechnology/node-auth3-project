import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignIn from './components/SignIn.js';
import NavBar from './components/NavBar.js';
import SignUp from './components/SignUp.js';
import Users from './components/Users.js';

class App extends Component {

  render() {
    return (
      <div>
      <Route path="/"render={props=><NavBar {...props}/>}/>
      <Route path="/signup" render={props => <SignUp {...props}/>} />
      <Route path="/signin" render={props=><SignIn {...props}/>}/>
      <Route path="/users" render={props=><Users{...props}/>}/>
      </div>
    );
  }
}

export default App;
