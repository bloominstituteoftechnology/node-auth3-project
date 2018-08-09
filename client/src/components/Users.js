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
            <li key={user.id}>{user.username}</li>
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

      axios
        .get('http://localhost:8000/api/users', requestOptions)
        .then(res => {
            this.setState({ users: res.data });
        })
        .catch(err => {
            console.error('Axios Failed');
        });
      console.log('state', this.state);
  }
}

export default Users;