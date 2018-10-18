import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  render() {
    return (
      <div>
        <h2>List of Users</h2>
      </div>
    );
  }

  componentDidMount() {
      const endpoint = 'http://localhost:9000/api/users';

      axios.get(endpoint).then(res => {
          console.log(res.data);
      }).catch(err => {
          console.error('Error', err);
      })
  }
}

export default Users;