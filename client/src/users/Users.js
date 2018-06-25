import React, { Component } from 'react';
import axios from 'axios';
import './users.css';

class Users extends Component {
  state = {
    users: [],
  };

  render() {
    return (
      <ul className='users'>
        {this.state.users.map(user => <li className='user' key={user._id}>{user.username}</li>)}
      </ul>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get('http://localhost:5500/api/users', requestOptions)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.error("Error retrieving Users.", err.message)
      });
  }
}

export default Users;