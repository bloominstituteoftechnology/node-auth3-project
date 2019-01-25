import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    };
  };

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const endpoint = 'http://localhost:1234/api/users';
    const options = {
      headers: {
        Authorization: token
      }
    };

    axios.get( endpoint, options )
      .then( (res) => {
        console.log( 'data from /api/users', res.data );
        this.setState({ users: res.data });
      })
      .catch( (err) => {
        console.log( 'error from /api/users', err );
      });
    // end-axios.get
  };


  render() {
    return(
      <div>
        <h2>Users:</h2>
        <ul>
          {this.state.users.map( (user) => {
            return(
              <li key={user.id}>{user.user}</li>
            );
          })}
        </ul>
      </div>
    );
  };
};

export default Users;