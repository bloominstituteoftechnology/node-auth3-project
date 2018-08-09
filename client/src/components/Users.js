import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Users extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = { headers: { authorization: token } };
    axios
      .get(`http://localhost:8000/api/users`, requestOptions)
      .then(response => this.setState({ users: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        {this.state.users.map(user => {
          return <div key={user.id}>{user.username}: {user.department}</div>
        })}
      </div>
    );
  }
}

export default Users;
