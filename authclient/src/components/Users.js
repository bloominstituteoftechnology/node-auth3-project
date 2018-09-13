import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [],
  }

  render() {
    return (
      <ul>
        {this.state.users.map(user => {
          return (
            <li key={user.id}>{user.name}</li>
          )
        })}
      </ul>
    )
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const reqOptions = {
      headers: {
        Authorization: token
      }
    }
    axios.get('http://localhost:8270/api/users', reqOptions).then(result => {
      console.log(result.data);
      this.setState({ users: result.data});
    }).catch(err => {
      console.error(err);
    })
  }
};

export default Users;
