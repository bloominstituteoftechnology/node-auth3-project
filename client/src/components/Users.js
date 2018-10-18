import React from 'react';
import axios from 'axios';

class Users extends React.Component {
  state = {
    users: [],
    signin: false,
  };

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get('http://localhost:5000/api/users', options)
      .then(response => {
        console.log(response);
        this.setState({ users: response.data, signin: true });
      })
      .catch(err => {
        this.setState({ signin: false });
      });
  }

  render() {
    return (
      <div>
        <h1>List of Users</h1>
        {this.state.signin ? (
          <ul>
            {this.state.users.map(user => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        ) : (
          <h1>You are not signed in</h1>
        )}
      </div>
    );
  }
}

export default Users;
