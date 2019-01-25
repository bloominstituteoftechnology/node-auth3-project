import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [],
    isAuthenticated: false
  }



  componentDidMount() {
    if(localStorage.getItem('jwt')){
    const token = localStorage.getItem('jwt');
    const endpoint = "http://localhost:3300/api/users";
    const options = {
      headers: {
        Authorization: token
      }
    }
    axios.get(endpoint, options)
      .then(res => {
        console.log(res);
        this.setState({
          users: res.data,
          isAuthenticated: true
        });
      }).catch(err => {
        console.log('error from /api/users', err);
      })
    } else {
      return <p className='margin-top'>Please Login To See Users</p>
    }
  }
  
  render() {
    const users = this.state.users
    if (this.props.loggedIn)
      return (
        <div>
          <h2>All Users Who Work At Lambda School</h2>
          <ul>
            {
              users.map(user => {
                return <li key={user.id}>Username: {user.username}, Department: {user.department}</li>
              })
            }
          </ul>
        </div>
      )
    else {
      return <p className='margin-top'>Please Login To See Users</p>
    }
  }
}

export default Users;
