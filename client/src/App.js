import React, { Component } from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './App.css';
import * as actions from './actions';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';

class App extends Component {
  onLogout = () => {
    this.props.logoutUser(this.props.history);
  }

  render() {
    return (
      <div className='App'>
        <AppBar position='static'>
          <Toolbar style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {
              localStorage.getItem('token')
                ? <React.Fragment>
                    <Button component={Link} to='/users' color='inherit'>View Users</Button>
                    <Button onClick={this.onLogout} color='inherit'>Sign Out</Button>
                  </React.Fragment>
                : <React.Fragment>
                    <Button component={Link} to='/register' color='inherit'>Register</Button>
                    <Button component={Link} to='/login' color='inherit'>Login</Button>
                  </React.Fragment>
            }
          </Toolbar>
        </AppBar>
        <Route
          path='/register'
          render={ props => (
            <Register {...props} registerUser={this.props.registerUser} error={this.props.error} />
          )}
        />
        <Route
          path='/login'
          render={ props => (
            <Login {...props} loginUser={this.props.loginUser} error={this.props.error} />
          )}
        />
        <Route
          path='/users'
          render={ props => (
            <Users {...props} fetchUsers={this.props.fetchUsers} users={this.props.users} error={this.props.error} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registeringUser: state.registeringUser,
    loggingInUser: state.loggingInUser,
    fetchingUsers: state.fetchingUsers,
    users: state.users,
    error: state.error
  };
};

export default withRouter(connect(mapStateToProps, actions)(App));
