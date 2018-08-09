import React, { Component } from "react";
import "./App.css";

// COMPONENTS //
import Login from "./components/Login/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default App;
