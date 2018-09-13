import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';
import axios from 'axios';
import './App.css';


export default class App extends Component {
  constructor(){
    super();
    this.state={
      username: '', 
      password: '',
      department: '',
    }
  }

inputHandler = e => {
  this.setState({[e.target.name]: e.target.value})
}

onRegisterHandler = e => {
  e.preventDefault(); 
  axios
    .post("http://localhost:9800/api/register", this.state)
    .then(res => {
        console.log('response', res); 
        localStorage.setItem('jwt', res.data.token);
        this.setState({username: '', password: '', department: ''}); 
    })
    .catch(err => {
        console.log(err);
    })
}

onLoginHandler = e => {
  e.preventDefault(); 

  axios
    .post("http://localhost:9800/api/login", this.state)
    .then(res => {
        console.log('response', res); 
        localStorage.setItem('jwt', res.data.token);
        this.setState({username: '', password: '', department: ''}); 
    })
    .catch(err => {
        console.log(err);
    })
}



  render() {
    console.log('state', this.state)
    return (
      <div className="App">  
      <Route
            path="/register"
            render={props => (
              <Register
                {...props}
                inputHandler={this.inputHandler}
                onRegisterHandler={this.onRegisterHandler}
              />
            )}
          />

      <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                inputHandler={this.inputHandler}
                onLoginHandler={this.onLoginHandler}
              />
            )}
          />

      <Route
            path="/users"
            render={props => (
              <Users
                {...props}
              />
            )}
          />          



      </div>
    );
  }
}
