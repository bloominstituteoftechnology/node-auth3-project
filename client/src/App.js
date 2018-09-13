import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import SignUp from './components/SignUp';
import style from './app.module.css';

class App extends Component {
  state = {
    status: '',
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
        if (!response.data.error)
          localStorage.setItem('auth-token', response.data.token);
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
            Home
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
      </div>
    );
  }
}

export default App;
