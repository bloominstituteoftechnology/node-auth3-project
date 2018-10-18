import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  render() {
    return (
      <div>
        <h1> Registered Users</h1>
      </div>
    );
  }

  componentDidMount() {
      const endpoint = 'http://localhost:7700/api/users';
      axios
      .get(endpoint)
      .then(res => {
          console.log(res.data);
      })
      .catch(err => {
          console.error("We got us an error here", err);
      });
  }
}

export default Users;
