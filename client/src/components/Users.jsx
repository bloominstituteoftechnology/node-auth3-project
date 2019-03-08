import React from 'react';
import axios from 'axios';
import Interceptor from './Interceptor';

class Users extends React.Component {
  state = {
    users: [],
  };
  componentDidMount() {
    //   const token = localStorage.getItem('token')
    //   const options = {headers:{authorization:token}}

    axios.get('/users').then(res => {
      this.setState({ users: res.data });
    });
  }
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
}
export default Interceptor(Users);