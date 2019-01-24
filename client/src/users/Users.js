import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const endpoint = 'http://localhost:4000/api/users';

    try {
      const token = localStorage.getItem('jwt');
      const requestOptions = {
        headers: {
          authorization: token
        }
      };
      const response = await axios.get(endpoint, requestOptions);
      this.setState({ users: response.data.users });
    } catch (error) {
      console.error('Problem getting the users');
    }
  }
  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(u => (
            <li key={u.id}>{u.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Users;
