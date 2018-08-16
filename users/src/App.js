import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import './styling/App.css';
import Signin from '../src/components/signin';
import Users from '../src/components/users';
import axios from 'axios';
import Signup from '../src/components/signup';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div>
        {localStorage.getItem('jwt') && (
      <button onClick={this.logoutHandler}>Logout</button>
    )}
      </div>
      <Route path ="/signin" component={Signin}></Route>
      <Route path ="/users" component={Users}></Route>
      <Route path ="/signup" component={Signup}></Route>
      </div>
    );
  }

  logoutHandler = event => {
    localStorage.removeItem('jwt');

    this.props.history.push('/signin');
  }
  
}


export default withRouter(App);
