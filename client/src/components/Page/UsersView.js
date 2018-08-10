import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

class UsersView extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      headers: { Authorization: token },
    };
    axios
      .get(API_URL, requestOptions)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(e => {
        console.error(e);
        alert('You tried it!');
        window.location.href = '/signin';
      });
  }

  render() {
    return (
      <main className="users-view">
        <h2>Users</h2>
        <div className="">
        {
          this.state.users.map(user => {
            return <div key={user.id}>{user.username}, {user.department}</div>;
          })
        }
        </div>
      </main>
    );
  }
};

export default UsersView;