import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };
    axios.get('http://localhost:3300/users', requestOptions)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.error('Axios Failed');
      })
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => {
            return (
              <li key={user.id}>{user.username}</li>  
            )
          })}
        </ul>
      </div>
    );
  }
}

export default Users;