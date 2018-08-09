import React, { Component } from "react";
import "./App.css";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Users from "./components/users";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Auth-II</h1>
        </header>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
