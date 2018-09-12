import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router";
import Home from "./components/Home";
import Signup from "./components/Signup";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/users" component={Home} />
          <Route exact path="/signin" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
