import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    const token = localStorage.getItem('jwt');
    if (token) {
      const requestOptions = {
        headers: {
          Authorization: token
        }
      };
      axios
        .get('http://localhost:8000/api/users', requestOptions)
        .then(res => {
          this.setState({ users: res.data });
        })
        .catch(err => console.log(err));
    } else {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div>
        {this.state.users.map(user => (
          <div key={user.username}>
            <h3>Username: {user.username}</h3>
            <h5>Department: {user.departments}</h5>
          </div>
        ))}
      </div>
    );
  }
}

export default Users;
