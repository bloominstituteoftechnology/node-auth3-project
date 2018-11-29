import React, {Component} from "react";
import "./App.css";
import axios from "axios";
import {Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
  handleSignOut = e => {
    e.preventDefault();
    localStorage.removeItem("token");
  };

  render() {
    return (
      <div className="App">
        <header />
        <section>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/signin" component={Login} />
            <button onClick={this.handleSignOut}>Sign Out</button>
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
