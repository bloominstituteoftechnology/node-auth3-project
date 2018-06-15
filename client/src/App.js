import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Link } from "react-router-dom";
import { Navigation, UserList, Login, Register } from "./components/index.js";

class App extends Component {
    state = {
      loggedIn : false
  }

  signoutHandler = () => {
      localStorage.removeItem('jwt');
      this.props.history.push('/login');
  }

  render() {
    return (
      <div className="App">
        <div>
          {localStorage.getItem('jwt') ? (
            <div>
              <Navigation/>
              <button onClick={this.signoutHandler}>Sign Out</button>
            </div>
          ) : (
            <Route exact path="/" render={() => <div><Link to="/login">Login</Link></div>}/>
          ) }
        </div>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/users" component={UserList}/>
      </div>
    );
  }
}

export default withRouter(App);
