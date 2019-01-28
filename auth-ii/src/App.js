import React, { Component } from 'react';
import './App.css';
import {NavLink, Route} from "react-router-dom";

import Home from "./components/home";
import Login from "./components/login";
import Users from "./components/users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact> Home </NavLink>
            &nbsp;|&nbsp;
            <NavLink to ="/signup"> Sign Up </NavLink>
            &nbsp;|&nbsp;
            <NavLink to ="/login"> Login </NavLink>
            &nbsp;|&nbsp;
            <NavLink to ="/users"> Users </NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.signout}> Sign Out </button>
          </nav>
          <main>
            <Route path="/" component={Home} exact></Route>
            {/* <Route path="/signup" component={SignUp} exact></Route> */}
            <Route path="/login" component={Login} exact></Route>
            <Route path="/users" component={Users} exact></Route>
          </main>
        </header>
      </div>
    );
  }

  signout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  }
}

export default App;
