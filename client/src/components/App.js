import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions';

import GUI from './GUI.js';
import UserList from './UserList.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <GUI /> */}
        <h1>List of Users: </h1>
        <UserList />
      </div>
    );
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

export default connect(mapStateToProps, { fetchUsers })(App);