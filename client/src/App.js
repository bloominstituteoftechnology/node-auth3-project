import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Authentication from './components/Authentication';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/users',{
      headers: {
        tokenKey: localStorage.getItem('token'),
        userdep: localStorage.getItem('User Department')
      }
    }).then(response => {
      this.setState({users: response.data})
    }).catch(err => {
      console.log('Ur error', err);
    });
  }

  handleLogout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <div>
          {this.state.users.length > 0 ? this.state.users.map(user => {
            return <div key={user.id}>{user.username}</div>
          }):"Loading..."}
          </div>
          <div>
          {<button onClick={this.handleLogout} className="logout-button">Log Out</button>}
          </div>
      </div>
    );
  }
}

export default Authentication(App);
