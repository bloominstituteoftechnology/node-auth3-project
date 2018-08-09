import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users : []
  }

  componentDidMount(){
    const options = {
      headers : {
        Authorization: localStorage.getItem('jwt')
      }
    }

    axios.get('http://localhost:3000/api/users', options)
      .then( data => {
        this.setState({users: data.data})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
    { (this.state.users) ? this.state.users.map( user => <li key={user.id}>{user.username}</li>) : null }
      </div>
    );
  }
}

export default Users;