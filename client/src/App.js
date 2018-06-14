import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    username: '',
    race: '',
    password: '',
    users: [],
    isSignedIn: false
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleRegister = () => {
    const { username, race, password } = this.state
    axios.post('https://lambda-projects-tpham045.c9users.io:8080/api/auth/register', { username, race, password })
      .then(response => {
        localStorage.setItem('jwt', response.data.token)
        this.setState({ isSignedIn: true })
      })
      .catch(err => console.log(err))
  }
  componentWillMount = () => {
    const token = localStorage.getItem('jwt')
    console.log(token)
    if (token && token !== 'undefined') {
      this.getUsers()
      this.setState({
        isSignedIn: true
      })
    }
  }
  getUsers = () => {
    const token = localStorage.getItem('jwt')
    if (token && token !== 'undefined') {
      const requestOptions = {
        headers: {
          Authorization: token,
        }
      }
      axios.get('https://lambda-projects-tpham045.c9users.io:8080/api/users', requestOptions)
        .then(response => {
          this.setState({ users: response.data })
        })
    }
  }
  handleSignIn = () => {
    const { username, password } = this.state
    axios.post('https://lambda-projects-tpham045.c9users.io:8080/api/auth/login', { username, password })
      .then(response => {
        localStorage.setItem('jwt', response.data.token)
        this.getUsers()
        this.setState({ username: '', password: '', isSignedIn: true })
      })
  }
  handleSignOut = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');

      this.setState({ isSignedIn: false })
    }
  }
  render() {
    const { username, race, password, isSignedIn, users } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
        </header>
        <div className="App-intro">
          <input placeholder='username' name='username' type='text' value={username} onChange={this.handleChange}/>
          <input placeholder='race' name='race' type='text' value={race} onChange={this.handleChange}/>
          <input placeholder='password' name='password' type='text' value={password} onChange={this.handleChange}/>
          <button onClick={this.handleRegister}>Register</button>
        </div>
        <div>
        { isSignedIn ? 
        <div>
          {users.map(user => 
            <div key={user._id}>{user.username}</div>
          )}
        <button onClick={this.handleSignOut}>Sign Out</button>
        </div>
        :
        <button onClick={this.handleSignIn}>Sign In</button>
        }
        </div>
      </div>
    );
  }
}

export default App;
