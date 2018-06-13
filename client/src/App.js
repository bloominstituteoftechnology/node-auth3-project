import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';


class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      username: '',
      race: ''
    }
  }

componentDidMount() {
  axios
    .get('http://localhost:5500/api/users')
    .then(response => {
      this.setState(() => ({users: [...response.data]}));
    })
    .catch(err => {
      console.log("error", err)
    });
}

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authenticating With JWS</h1>
        </header>
        <ul>
          {this.state.users.map(user => {
            return (
              <li key={user}>
                <p>Username: {user.username}</p>
                <p>Race: {user.race}</p>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
