import React from 'react';
import Axios from 'axios';

import requireAuth from './require.js';

class Users extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    Axios
      .get('/users')
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default requireAuth(Users);