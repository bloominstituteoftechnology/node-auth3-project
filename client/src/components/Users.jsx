import React from 'react';
import axios from 'axios';
import Interceptor from './Interceptor';

class Users extends React.Component {
  state = {
    users: [],
  };
 
  render() {
    return (
      <>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(u => (
            <li key={u.id}>{u.username}</li>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const endpoint = `/users`;
    axios
    .get(endpoint)
    .then(res => {
      console.log(res)
      this.setState({ users: res.data.users });
    })
    .catch(error => {
      console.error('USERS ERROR', error)
    });
  }
}
export default Interceptor(Users);