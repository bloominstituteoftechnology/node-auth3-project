import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
//import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(pontificate) {
    super(pontificate);
    this.State = {
      token: '',
      username: '',
      password: '',
      deptcode: ''
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="my-app">          
          <h1>Hey-Hey-Hey-Hey!</h1>
          <nav className="nav">
            {/* <button><Link to='/home'>HOME</Link></button> */}
            <button><Link to='/login'>LOGIN</Link></button>
            <button><Link to='/register'>REGISTER</Link></button>
            {/* <button><Link to='/logout'>LOGOUT</Link></button> */}
          </nav>
          <div className="content">
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* <Route path="/home" component={users} /> */}
          </div>

        </div>

      </div>
    );
  }
  handleInput();
  handleSubmit();
}

export default App;
{/* <form action="">
<input type="text">
<input type="text">
<button>Login</button>
<button>Register</button>
</form> */}
