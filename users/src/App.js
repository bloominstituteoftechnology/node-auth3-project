import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Users</h1>
        </header>
        <form>
          <h2>Log In to See List of Users</h2>
          <input placeholder="Enter your Username" />
          <input placeholder="Enter your Password" />
          <button>Log In</button>
          <hr />
          <p>No account yet? Please register.</p>
          <button>Register Now</button>
        </form>

        {/*<Route exact path="/" {Signin}/>*/}
      </div>
    );
  }
}

export default App;
