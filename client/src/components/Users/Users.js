import React, { Component } from 'react';
import axios from 'axios';

import User from './User';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: ''
    };
  }
  
  componentDidMount() {
    const token = window.localStorage.getItem('token');
    const options = {
      headers: { Authorization: token }
    };
    
    axios('http://localhost:5500/api/users', options)
      .then(({ data }) => {
        this.setState({ users: data });
      })
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <User users={ this.state.users } />
    )
  }
}
 
export default Users;