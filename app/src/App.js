import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    localStorage.setItem('username', this.state.username)
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="login-container">
            <div className="login-box">
              <p className="title">Welcome to the Authentication Page</p>
              <form onSubmit={this.handleSubmit} className="loginInput">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleInput}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInput}
                />
              </form>
              <button onClick={this.handleSubmit} className="login-button">
                Log in
          </button>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
