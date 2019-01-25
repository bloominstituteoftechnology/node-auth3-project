import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import logo from './logo.svg';
import './css/App.css';
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
    const token = localStorage.getItem('jwt');
    const options ={
      headers: {
        Authorization: token
      }
    }
    axios.get('http://localhost:4000/api/users', options)
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
    axios.post('http://localhost:4000/api/register', newUser)
      .then(res =>{
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(()=>{
        console.log('Sorry, failed to add new user')
      })
  }

  logInUser = (userCreds) =>{
    axios.post('http://localhost:4000/api/login', userCreds)
      .then(res =>{
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(() =>{
        console.log('Sorry, failed to validate user credentials')
      })
  }
  render() {
    return (
      <div className="app-container">
          
            <Route exact path = '/register' render = {(props) => <SignUp {...props} users = {this.state.users} registerUser = {this.registerUser}/>} />
            <Route exact path = '/' render = {(props) => <SignIn {...props} users = {this.state.users} logInUser = {this.logInUser}/>} />
            <Route exact path = '/users' render = {(props) => <UsersPage {...props} users = {this.state.users} fetchUsers = {this.fetchUsers}/>} />
          
      </div>
    );
  }
}

export default App;
