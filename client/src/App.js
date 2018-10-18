//Impoert dependencies
import React, { Component } from 'react';
import {Route, withRouter } from 'react-router-dom';
import './App.css';
//Import view components
import HomeView from './views/HomeView.js';
import SignUpView from './views/SignUpView.js';
import SignInView from './views/SignInView.js';
import UsersView from './views/UsersView.js';
// import EditView from './views/EditView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">User List</h1>
          <nav className="navigation-panel">
              <button onClick={() => this.props.history.push("/")}
                      className="Home-button">
                      Home</button>
              <button onClick={() => this.props.history.push("/signup")}  
                      className="signup-button">
                      Sign Up</button>
              <button onClick={() => this.props.history.push("/signin")}  
                      className="signin-button">
                      Sign In</button>
              <button onClick={() => this.props.history.push("/users")}  
                      className="users-button">
                      Users</button>
          </nav>
        </div>
        <div className="display-panel">
            <Route  exact
                    path='/'
                    component={HomeView}/>
            <Route  path="/signup"
                    component={SignUpView}/>
            <Route  path='/signin'
                    component={SignInView}/>
            <Route  path='/users'
                    component={UsersView}/>
        </div>
        
      </div>
    );
  }
}

export default withRouter(App);
