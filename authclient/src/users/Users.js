import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  render() {
    return (
      <div>
        <h2>Users List</h2>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt'); 

    const endpoint = 'http://localhost:5000/api/users';
    const options = { 
      headers: {
        Authorization: token
      },
    };
    axios
      .get(endpoint, options)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error('ERROR', err);
      })
  }
}

export default Users;