import React, { Component } from 'react'
import axios from 'axios';

export default class Users extends Component {
  state = {
     users:[]
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {
            this.state.users.map(user => 
               (<li key={user.id}>{user.username}</li>)
            )
          }
        </ul>
      </div>
    )
  }

  componentDidMount() {
     const token = localStorage.getItem('jwt');
     const endpoint = 'http://localhost:5500/api/users';
     const options = {
           headers: {
              Authorization:token
           }
     };
     axios.get(endpoint, options)
          .then( response => {
              console.log('data from /api/users', response.data)
              this.setState({
                 users:response.data
              });
          })
          .catch(err => {
               console.log('error from /api/users', err);
          })
  }
}
