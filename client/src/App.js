import React, { Component } from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api';

class App extends Component {
  state = { users: [] };

  getUsers = () => {
    // axios.get(`${URL}/restricted/users`, 'auth header here');
  };

  componentDidMount() {
    getUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {this.state.users.map(user => {
            const { name, id } = user;
            return <p key={id}>{name}</p>
          })}
        </div>
      </div>
    );
  }
}

export default App;
