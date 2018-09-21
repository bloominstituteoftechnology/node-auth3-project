import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        Users: []
    };
  render() {
    return (
        <div>
            <ul>
                {this.state.Users.map(user => <li key={user.id}>{user.username}</li>)}
            </ul>
        </div>
    );
  }

  componentDidMount() {
      const token = localStorage.getItem('jwt');
      const reqOptions = {
          headers: {
              Authorization: token
          }
      };
      axios
        .post('http://localhost:3000/api/users', reqOptions)
        .then(res => {
            this.setState({ Users: res.data });
        })
        .catch(err => {
            console.log(err);
        });
  };
}

export default Users;