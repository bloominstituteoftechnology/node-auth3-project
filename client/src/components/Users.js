import React from 'react';
import axios from 'axios';

class Users extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/users')
      .then(response => console.log(response))
      .catch(err => {
        alert('You are not signed in.');
      });
  }

  render() {
    return (
      <div>
        <h1>List of Users</h1>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
