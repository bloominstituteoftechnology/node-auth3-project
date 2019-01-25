import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import Users from './components/Users';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  addNewUser = user => {
    axios.post('http://localhost:3300/api/register', user)
      .then(res => {
        console.log('user has been added');
      })
      .catch(err => {
        console.log(err);
      });
  }

  logIn = user => {
    axios.post('http://localhost:3300/api/login', user)
      .then(res => {
        localStorage.setItem('token', res.data.token);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUsers = () => {
    const token = localStorage.getItem('token');
    const options = {
      headers: {
        auth: token
      }
    }
    axios.get('http://localhost:3300/api/users', options)
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <Route path='/' component={Home} />
        <Route path='/signup' render={props => <SignUpForm {...props} addNewUser={this.addNewUser} />} />
        <Route path='/signin' render={props => <SignInForm {...props} logIn={this.logIn} />} />
        <Route path='/users' render={props => <Users {...props} getUsers={this.getUsers} users={this.state.users} />} />
      </div>
    );
  }
}

export default App;
