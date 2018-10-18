import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import UsersList from './components/UsersList';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

class App extends Component {
  state = {
    users: [],
    username: ''
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');

    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(`http://localhost:4000/api/users`, options)
      .then(response => {
        console.log(response.data);
        this.setState({ users: response.data.users });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Authentication w/ JWTs
          </p>
        </header>
        <div>
          <UsersList users = {this.state.users} />
        </div>
        <div>
        <SignUpForm 
          name={this.state.username} 
          password={this.state.password} 
          department={this.state.department} 
          userSignUp={this.userSignUp}
          handleInputChange={this.handleInputChange}
        />  
        </div>
        <div>
        <SignInForm 
          name={this.props.username} 
          password={this.props.password} 
          userSignIn={this.props.userSignIn}
          handleInputChange={this.props.handleInputChange}
        />  
        </div>
      </div>
    );
  }
}

export default App;
