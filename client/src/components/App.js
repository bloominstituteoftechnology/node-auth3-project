import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import { fetchUsers } from '../actions';

import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import UsersView from './views/UsersView';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');
  }
}

const mapStateToProps = state => {
  return {
    fetchingUsers: state.fetchingUsers,
    // addingSmurf: state.addingSmurf,
    // deletingSmurf: state.deletingSmurf,
    error: state.error
  }
}

export default withRouter(App);