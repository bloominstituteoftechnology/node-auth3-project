import React from 'react';
import axios from 'axios';

class Users extends React.Component {
  state = {
    users: [],
  };

  render() {
    return (
      <ul>
        {this.state.users.map(user => <li key={user._id}>{user.username}</li>)}
      </ul>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      header: {
        Authorization: token,
      }
    }

    axios
      .get('htt://localhost:5500/api/auth/users', requestOptions)
      .then(response => {
        this.setState({ users: response.data });
        console.log("response data", response.data);
      })
      .catch(err => console.log(err));
  }
}

export default Users;