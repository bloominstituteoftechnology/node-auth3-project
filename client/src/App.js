import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

const url = process.env.REACT_APP_API_URL;

class App extends Component {
  state = {
    loggedIn: false,
    users: [],
  };

  authenticate = () => {
    const token = localStorage.getItem('token');
    const options = {
      headers: {
        authentication: token,
      },
    };
    if (token) {
      axios
        .get(`${url}/users`, options)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          this.props.history.push('/login');
        });
    } else {
      this.props.history.push('/login');
    }
  };

  componentDidMount() {
    this.authenticate();
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
