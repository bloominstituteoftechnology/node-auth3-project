import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Users from "./components/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <button onClick={()=>localStorage.removeItem("JWT")}>Signout</button>
        <Switch>
          <Route exact path="/users" component={Users} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
