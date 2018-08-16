import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Signin from "./auth/Signin";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signin" component={Signin}>
          {" "}
        </Route>
      </div>
    );
  }
}

export default App;
