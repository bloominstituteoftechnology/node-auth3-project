import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [],
  };

  render() {
    if (!this.state.users || !this.state.users.length) {
      return (
          <div><h3>Access Denied</h3>
              <p>You do not have access to this information.</p></div>
      )
  }

    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(u => (
            <div key={u.id}>
            <p>Alias: {u.username}</p>
            <p>Department: {u.department}</p>
            </div>
            
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');

    const endpoint = 'http://localhost:3300/api/users';
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(endpoint, options)
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data.users });
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  }
}

export default Users;
