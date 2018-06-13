import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom'
import InputComponent from './components/Input'
import axios from 'axios'
import { UserList } from './components/UsersList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loggedin: false
    };
  }
  register = (user) => {
    axios.post('http://localhost:5500/api/auth/register', user)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        this.setState({ loggedin: true })
      })
      .catch(err => console.log(err.message))
  }
  login = (user) => {
    axios.post('http://localhost:5500/api/auth/login', user)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        this.setState({ loggedin: true })
      })
      .catch(err => console.log(err.message))
  }
  logOut = () => {
    localStorage.clear()
    this.setState({ users: [], loggedin: false })
  }
  fetchUsers = () => {
    axios.get('http://localhost:5500/api/users', { headers: { "authorization": localStorage.getItem('token') } })
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(err => console.log(err.message))
  }
  render() {
    return (
      <div className="App">
        <h4>Please login or register</h4>
        <Link to='/login'><button type="button">Login</button></Link>
        <Link to='/login'><button type="button" onClick={this.logOut} >LogOut</button></Link>
        <Route path="/signup" render={props => <InputComponent {...props} page="signup" register={this.register} fetch={this.fetchUsers} />} />
        <Route path="/login" render={props => <InputComponent {...props} login={this.login} fetch={this.fetchUsers} />} />
        <Route path="/users" render={props => <UserList {...props} users={this.state.users} />} />
        {/* <Route exact path="/users" render={(props) => (
          this.state.loggedIn ? (
            <UserList {...props} users={this.state.users} />
          ) : (
              <Redirect to={{ pathname: "/login", state: 'please sign in!' }} />
            )
        )} /> */}
      </div>
    );
  }
}

export default App;
