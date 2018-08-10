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

  onSubmit = e => {
    e.preventDefault();
    localStorage.clear(); 
    window.location.href = '/signin';   
  };

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const resOptions = {
      headers: {authorization: token},
    };
    axios
      .get(API_URL, resOptions)
      .then(res => {
        this.setState({users: res.data});
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
        <ul className="">
        {
          this.state.users.map(user => {
            return <li key={user.id}>{user.username}, {user.department}</li>;
          })
        }
        </ul>
        <button onClick={this.onSubmit}>Log out</button>
      </main>
    );
  }
};

export default UsersView;