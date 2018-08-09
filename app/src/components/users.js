import React, { Component } from 'react';
import axios from 'axios'


class Users extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt')

    const auth = {
      headers: {
        authorization: token
      }
    }

    axios
      .get('http://localhost:8000/api/users', auth)
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(err => {
        console.log('error: ', err.message)
      })
  }

  render() {
    return (
      <div className='users'>
        <ul>
          {this.state.users.map(u =>
            <li key={u.id}> username: {u.username} department: {u.department}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Users;
