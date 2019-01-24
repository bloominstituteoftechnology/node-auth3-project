import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import UsersPage from './Components/UsersPage';


import {Link} from 'react-router-dom';

import axios from 'axios';

class App extends Component {
  constructor(){
    super()
    this.state ={
      users : []
    }
  }

  fetchUsers = () =>{
    axios.get('localhost:4000/api/users')
      .then(res =>{
        this.setState({
          users: res.data
        })
      })
      .catch(()=>{
        console.log('Sorry, could not fetch users')
      })
  }

  componentDidMount(){
    this.fetchUsers()
  }

  registerUser = (newUser) =>{
    axios.post('localhost:4000/api/register', newUser)
      .then(res =>{
        console.log(res)
      })
      .catch(()=>{
        console.log('Sorry, failed to add new user')
      })
  }

  logInUser = (userCreds) =>{
    axios.post('localhost:4000/api/login', userCreds)
      .then(res =>{
        console.log(res)
      })
      .catch(() =>{
        console.log('Sorry, failed to validate user credentials')
      })
  }
  render() {
    return (
      <div className="App">
          
            <Route exact path = '/register' render = {(props) => <SignUp {...props} users = {this.state.users} registerUser = {this.registerUser}/>} />
            <Route exact path = '/' render = {(props) => <SignIn {...props} users = {this.state.users} logInUser = {this.logInUser}/>} />
            <Route exact path = '/users' render = {(props) => <UsersPage {...props} users = {this.state.users} fetchUsers = {this.fetchUsers}/>} />
          
      </div>
    );
  }
}

export default App;
