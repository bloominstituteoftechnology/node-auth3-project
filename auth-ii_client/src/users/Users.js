import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router';


class Users extends Component {
  state = {
    users: [],
    LoggedIn: true
  }

  render() {
    const redirectToHome = this.state.LoggedIn;
    if (redirectToHome === false) {
      return (<Redirect exact to='/' />)
    }
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {
            this.state.users.map(user => 
              ( <li key={user.id}>
                {user.username}
              </li> )
            )
          }
        </ul>
        <Button color='warning' onClick={this.signout}>Sign Out</Button>
      </div>
    )
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const endpoint = 'http://localhost:1234/api/users';
    const options = {
      headers: {
        Authorization: token
      }
    };

    axios.get(endpoint, options)
    .then(res => {
      console.log('data from /api/users', res.data);
      this.setState({ users: res.data })
    })
    .catch(err => {
      console.log('error from /api/users', err);
    })
  }

  signout = () => {
    localStorage.removeItem('jwt');
    this.setState({ LoggedIn: false });
  }

}

export default Users;