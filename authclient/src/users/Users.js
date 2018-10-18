import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state= {
        users: []
    };
  render() {
    return (
      <div>
        <h1> Registered Users</h1>
        <ul>
            {this.state.users.map(user => (
                <li key={user.id}>
                {user.username}
                </li>
            ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
      const token = localStorage.getItem('jwt');

      const endpoint = 'http://localhost:7700/api/users';
      const options = { 
          headers: {
              Authorization: token
        },
      };
      axios
      .get(endpoint)
      .then(res => {
          console.log(res.data);
          this.setState({ users: res.data.users});
      })
      .catch(err => {
          console.error("We got us an error here", err);
      });
  }
}

export default Users;
