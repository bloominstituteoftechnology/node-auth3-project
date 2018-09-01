import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Login from './auth/Login';
import Users from './users/Users';
import './App.css';
//NOTE: Look into implementing authorization via a higher order component that wraps around the app. There's a video in the training kit (JSON web token(video right in front)) by Sean where he talks about it. We also went over it when we covered React. 

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          We are on. 
        </p>
        <div>
          {localStorage.getItem('jwt') && (
            <button onClick = {this.logoutHandler}>Logout</button>
          )}
  
        </div>
        <Route path = "/login" component= {Login}></ Route>
        <Route path = "/users" component= {Users}></ Route>
      </div>
    );
  }
  
  logoutHandler = e => {
    localStorage.removeItem('jwt');

    this.props.history.push('/login')
  };
}

export default withRouter(App);
