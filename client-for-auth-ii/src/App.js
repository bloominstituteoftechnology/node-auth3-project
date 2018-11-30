import React, { Component } from 'react';
import axios from 'axios';
import { Route, withRouter } from 'react-router-dom';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Users from './components/Users';
import './styles/App.css';

const url = process.env.REACT_APP_API_URL;

class App extends Component {
  state = {
    loggedIn: false,
    users: []
  };

  authenticate = () => {
    const token = localStorage.getItem('auth_token');
    const options = {
      headers: {
        authentication: token
      }
    };
    if (token) {
      axios
        .get(`${url}/api/users`, options)
        .then(res => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          }
        })
        .catch(err => console.log(err));
    } else {
      this.props.history.push('/login');
    }
  };

  logout = () => {
    if (this.state.loggedIn) {
      localStorage.removeItem('auth_token');
      this.setState({ loggedIn: false });
      this.props.history.push('/login');
    }
  };

  componentDidMount() {
    this.authenticate();
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }

  render() {
    return (
      <div className="App">
        {/* Routes and stuff! */}
        <Navbar logout={this.logout} loggedIn={this.state.loggedIn} />
        <Route
          exact
          path="/"
          render={routerProps => (
            <Users {...routerProps} users={this.state.users} />
          )}
        />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default withRouter(App);
