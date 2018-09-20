import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';

import SignIn from './ClientRoutes/SignIn';
import SignUp from './ClientRoutes/SignUp';
import Users from './ClientRoutes/Users';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/users" component={Users} />
      </div>
    );
  }


  SignOut = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin');
  }
}


export default withRouter(App);
