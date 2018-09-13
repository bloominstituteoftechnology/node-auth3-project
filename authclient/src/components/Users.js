import React, { Component } from 'react';
import axios from 'axios';
axios.credentials = true;

class Users extends Component {
  state = {
    users: [],
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => {
            return (
              <li key={user.id}>{user.userName}</li>
            )
          })}
        </ul>
        <button onClick={this.logout}>Log Out</button>
      </div>
    )
  }

  logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin')
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const reqOptions = {
      headers: {
        Authorization: token
      }
    }
    axios.get('http://localhost:8270/api/users', reqOptions).then(result => {
      console.log(result.data);
      this.setState({ users: result.data});
    }).catch(err => {
      console.error(err);
    })
  }
};

export default Users;
