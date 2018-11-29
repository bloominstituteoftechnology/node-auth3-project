import React, { Component } from 'react';
import { LoginForm, Login, Register } from './Components'
import { Switch, Route, NavLink } from 'react-router-dom'
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const port = 5000

export const proccess = { env: {
  host: ('http://localhost:' + port)
}}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loggedIn: false
    }
  }


  componentDidMount() {
    this.getUsers();
  }
  register = async (creds) => {
    try {
      const userId = await axios.post(process.env.API_REACT_HOST + '/api/register', creds)
      await this.setState({ userId })
      console.log('register', userId)
    } catch(err) {
      console.log(err)
    }
  }


  getUsers = async () => {
    try {
      const token = window.localStorage.getItem('react_auth_token')
      const options = {
        headers: {
          Authentication: token,
        },
      };
      const users = await axios.get(process.env.API_REACT_HOST + '/api/users', options)
      console.log('getUsers', users)
      await this.setState({ users: users.data })
    } catch(err) {
      console.log(err)
    }
  }  
  logOut = async () => {
    try {
      const loggedOut = await axios.post(process.env.API_REACT_HOST + '/api/logout')
      console.log('getUsers', loggedOut)
      await this.setState({ loggedIn: false })
    } catch(err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div className="App" style={styles.App}>
        <nav>
          <NavLink to='/'>Home</NavLink> 
          <NavLink to='/login'>Login</NavLink> 
          <NavLink to='/register'>Register</NavLink> 
        </nav>
        <div style={Object.assign({}, styles.loginBar, this.state.loggedIn 
          ? styles.loggedIn : null)}></div>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path='/' render={() => {
            return (
              <React.Fragment>
                <h2>Users</h2>       
                <ol>
                  {this.state.users.map(user => <User {...{
                    key: user.id, 
                    user
                  }} />)} 
                </ol>
              </React.Fragment>
              )
            }} />
        </Switch>
        <header className="App-header">
          <LoginForm 
          {...{
            creds: this.state.creds,
            handleCreds: this.handleCreds,
            loggedIn: this.state.loggedIn
            }}>
          </LoginForm>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}
const User = (props) => {
  const { user } = props
  return (
    <li>
    <h1>{user.id}</h1> 
    <h2>{user.username}</h2> 
    <h3>{user.password}</h3> 
    </li>
  )
}

const styles = {
  App: {
    display: 'flex'
  },
  loginBar: {
    height: 'auto',
    backgroundColor: 'red',
    width: '100px',
  },
  loggedIn: {
    backgroundColor: 'green'
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
}

export default App;
