import React, { Component } from 'react';
import ring from './oneringGIF.gif';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addUser = () => {
    const userInfo={ username: this.state.username, password: this.state.password}
    axios
        .post('http://localhost:5500/api/auth/register', userInfo)
        .then(response => {
            this.setState({ username: '', password: ''})
        })
        .catch(error => {
            console.log(error)
        })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ring} className="ring-logo" alt="logo" />
          <h1 className="App-title">LOTR Database:</h1>
        </header>
        <form className="input">
          <input 
              className="username-input"
              onChange={this.handleInputChange}
              placeholder="Enter Username"
              name="username"
              value={this.state.username}
          />
          <input
              className="password-input"
              onChange={this.handleInputChange}
              placeholder="Enter Password"
              name="password"
              value={this.state.password}
          />
        </form>
        <button 
          className="submit-button"
          onClick={this.addUser}
        >
        Sign Up
        </button>
      </div>
    );
  }
}

export default App;
