import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import * as actions from './actions';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route
          path='/register'
          render={ props => (
            <Register {...props} registerUser={this.props.registerUser} />
          )}
        />
        <Route
          path='/login'
          render={ props => (
            <Login {...props} loginUser={this.props.loginUser} />
          )}
        />
        <Route
          path='/users'
          render={ props => (
            <Users {...props} fetchUsers={this.props.fetchUsers} users={this.props.users} />
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
