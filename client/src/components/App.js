import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

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

export default connect(mapStateToProps, { fetchSmurfs, addSmurf, deleteSmurf })(App);