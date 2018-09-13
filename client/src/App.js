import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import style from './app.module.css';

class App extends Component {
  state = {
    status: '',
    loggedIn: false,
  };

  registerUser = ({ username, password, department }) => {
    this.setState({ status: 'Sending request...' });
    axios
      .post('http://localhost:5000/api/register', {
        username,
        password,
        department,
      })
      .then(response => {
        this.setState({ status: response.data.message });
        if (!response.data.error) {
          localStorage.setItem('auth-token', response.data.token);
          this.setState({ loggedIn: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  loginUser = ({ username, password }) => {
    this.setState({ status: 'Sending request...' });
    axios
      .post('http://localhost:5000/api/login', {
        username,
        password,
      })
      .then(response => {
        this.setState({ status: response.data.message });
        if (!response.data.error) {
          localStorage.setItem('auth-token', response.data.token);
          this.setState({ loggedIn: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <header className={style.nav}>
          <Link className={style.link} to="/">
            Register
          </Link>
          <Link className={style.link} to="/login">
            Login
          </Link>
          <Link className={style.link} to="/users">
            Users
          </Link>
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <SignUp onSubmit={this.registerUser} status={this.state.status} />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <Login onSubmit={this.loginUser} status={this.state.status} />
          )}
        />
      </div>
    );
  }
}

export default App;
