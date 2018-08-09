import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state= {
        users: []
    };

  render() {
    return (
      <div className="Users">
        <u1>
          {this.state.users.map(user => 
            <li key={user.id}>
              <p>{user.username}</p>
              <p>{user.department}</p>
            </li>
          )}
        </u1>
      </div>
    );
  }

  componentDidMount() {
      const token = localStorage.getItem('jwt');
      const requestOptions = {
        headers: {
          Authorization: token
        }
      }
      if (token) {
      axios
        .get('http://localhost:8000/api/users', requestOptions)
        .then(res => {
            this.setState({ users: res.data });
        })
        .catch(err => {
            console.error('Axios Failed')
        }) 
      } else {
        setTimeout(() => window.location.pathname = '/api', 3000)
      }
      console.log('state', this.state);
  }
}

export default Users;