import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';
import Logout from './components/Logout';
import axios from 'axios';
import './App.css';


class App extends Component {
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
        this.props.history.push('/users');
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
        this.props.history.push('/users');
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
        <div>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/logout">Logout</NavLink>
          <NavLink to="/users">Users</NavLink>
        </div>

      <div> 
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

      <Route
            path="/logout"
            render={props => (
              <Logout
                {...props}
              />
          )}
          />            

      </div>
    </div>
    );
  }
}

export default withRouter(App);