import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: []
  };
  render() {
    return (
      <div>
        <h1>All of these users</h1>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id} className='users__user'>
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const endpoint = 'http://localhost:8000/api/users';
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get(endpoint, options)
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log('error occured: ', err);
      });
  }
}

export default Users;
