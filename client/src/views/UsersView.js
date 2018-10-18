import React, { Component } from 'react';
import axios from 'axios';
import './view.css';

class Users extends Component {
  state = {
    users: []
  };

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(u => (
            <li key={u.id}>{u.username}</li>
          ))}
        </ul>
        <h3 className="alertMessage">You have not signed in to view the users</h3>
      </div>
    );
  }

  alertMessage = document.getElementsByClassName('alertMessage');

  componentDidMount() {
    const token = localStorage.getItem('jwt');

    const endpoint = 'http://localhost:3300/api/users';
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get(endpoint, options)
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data.users });
      })
      .catch(err => {
        this.alertMessage[0].style.display = "block";
        console.error('ERROR', err);
      });
  }
}

export default Users;
