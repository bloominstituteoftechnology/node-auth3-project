import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, withRouter } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Users from './components/Users';

const URL = 'http://localhost:9000/api';

class App extends Component {
  state = { users: [] };

  getUsers = () => {
    const token = localStorage.getItem('token');
    axios.get(`${URL}/restricted/users`, { headers: { 'auth': token } })
      .then(({ data }) => {
        this.setState({ users: data })
      })
      .catch(err => {
        if (err === 'Request failed with status code 401') return null;
        else console.error(err);
      });
  };

  signOut = () => {
    localStorage.removeItem('token');
    this.setState({ users: [] });
  };

  componentDidUpdate() {
    this.getUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Users DB Access</h1>
          <Link to="/signin" onClick={this.signOut}>Sign out</Link>
        </header>

        <br />

        <Route 
          path="/signup" 
          render={(props) => <SignUp {...props} />} 
        />
        <Route 
          path="/signin" 
          render={(props) => <SignIn {...props} />}
        />
        <Route 
          path="/users" 
          render={(props) => <Users {...props} users={this.state.users} />} 
        />
      </div>
    );
  }
}

export default withRouter(App);
