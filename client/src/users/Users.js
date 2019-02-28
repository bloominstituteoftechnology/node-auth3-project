import React from 'react';
import axios from 'axios';

import requiresAuth from '../auth/requiresAuth';

class Users extends React.Component {
  state = {
    users: [],
  };

  render() {
    return (
      <>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(u => (
            <li key={u.id}>{`Name: ${u.username}   Dept: ${u.department}`}</li>
            
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    axios.get('/users').then(res => {
      this.setState({ users: res.data.users });
    });
  }
}

export default requiresAuth(Users);