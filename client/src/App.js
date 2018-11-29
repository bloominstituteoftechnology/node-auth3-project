import React, { Component } from 'react';
import { LoginForm, Form } from './Components'
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const port = 5000
const proccess = { env: {
  host: ('http://localhost:' + port)
}}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creds: {username: '', password: ''},
      users: [],
      loggedIn: false
    }
  }

  updateCreds = (creds) => {
    this.setState({creds})
  }

  componentDidMount() {
    this.getUsers();
  }
  register = async (creds) => {
    try {
      const userId = await axios.post(proccess.env.host + '/api/register', creds)
      await this.setState({ userId })
      console.log('register', userId)
    } catch(err) {
      console.log(err)
    }
  }
  login = async (creds) => {
    try {
      const login = await axios.post(proccess.env.host + '/api/login', creds)
      console.log('login', login)
      window.localStorage.setItem('token', login.token);
      await this.setState({ loggedIn: true })
    } catch(err) {
      console.log(err)
    }
  }
  getUsers = async () => {
    try {
      const users = await axios.get(proccess.env.host + '/api/users')
      console.log('getUsers', users)
      await this.setState({ users })
    } catch(err) {
      console.log(err)
    }
  }  
  logOut = async () => {
    try {
      const loggedOut = await axios.post(proccess.env.host + '/api/logout')
      console.log('getUsers', loggedOut)
      await this.setState({ loggedIn: false })
    } catch(err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Form {...{ 
            inputs: { username: '', password: ''},
            onSubmit: this.register,
            formTitle: 'register',
            action: 'register'
          }} />
          <Form {...{ 
            inputs: { username: '', password: ''},
            onSubmit: this.login,
            formTitle: 'login',
            action: 'login'
          }} />
          <LoginForm 
            {...{
              creds: this.state.creds,
              handleCreds: this.handleCreds
              }}
            loggedIn={this.state.loggedIn} ></LoginForm>
          <div style={styles.buttonsContainer}>
            <button onClick={this.logOut}>Log Out</button>
            <button onClick={this.getUsers}>Get Users</button>
          </div>

        </header>
      </div>
    );
  }
}

const styles = {
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
}

export default App;
