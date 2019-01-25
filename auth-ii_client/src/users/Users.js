import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [],
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {
            this.state.users.map(user => 
              ( <li key={user.id}>
                {user.username}
              </li> )
            )
          }
        </ul>
      </div>
    )
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const endpoint = 'http://localhost:1234/api/users';
    const options = {
      headers: {
        Authorization: token
      }
    };

    axios.get(endpoint, options)
    .then(res => {
      console.log('data from /api/users', res.data);
      this.setState({ users: res.data })
    })
    .catch(err => {
      console.log('error from /api/users', err);
    })
  }
}

export default Users;