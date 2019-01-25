import React, { Component } from "react";
import { Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Users from "./components/Users";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Register from "./components/Register"

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/signin" component={SignIn} exact />
        <Route path="/users" component={Users} exact />
      </div>
    );
  }
}

export default App;
