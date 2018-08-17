import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get('http://localhost:5000/api/users', requestOptions)
      .then((response) => {
        this.setState({ users: response.data });
        console.log('state', this.state);
      })
      .catch((err) => {
        console.error('axios failed');
      });
  }

  render() {
    return (
      <div className="Users">
        <ul>
          {this.state.users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
