import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  render() {
    return (
      <div>
        <h1>All of these users</h1>
      </div>
    );
  }

  componentDidMount() {
    const endpoint = 'http://localhost:8000/api/users';

    axios
      .get(endpoint)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log('error occured: ', err);
      });
  }
}

export default Users;
