import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [],
  };

//create users list
 render() {
    return (
      <ul>
	{this.state.users.map(user => <li key={user._id}>{user.username}</li>)}
      </ul>
    );
 }

  //make sure there is a token before displaying users
  //first look for token, then when you get, check and make sure the token is valid
 componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      headers: {
	Authorization: token,
      },
    };

    axios.get('http://localhost:5500/api/users', requestOptions)
      .then(response => {
	this.setState({ users: response.data });
      })
      .catch(err => {
	console.log(err);
      });
 };

};
 
  export default Users;
  
