import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Users extends Component {
  render() {
    return (
      <div className="App">
        <h2>User Information:</h2>
      </div>
    );
  }

  componentDidMount(){
    const endpoint = 'http://localhost:7777/api/users';
    axios.get(endpoint)
    .then(res => {
      console.log(res.data);

    }).catch(err => {
      console.error('ERROR', err)
    })
  }
}

export default Users;