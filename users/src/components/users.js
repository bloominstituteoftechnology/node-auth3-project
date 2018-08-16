import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
    state={
       users: []
    }

  render() {
    return (
      <div className="Users">
      <ul> 
          {this.state.users.map(user => 
          <li key={user.id}>
          {user.username}
          </li>
            )}
          </ul>
                    
      </div>
    );
  }



componentDidMount() {
   const token = localStorage.getItem('jwt');

   const requestOptions = {
       headers: {
           Authorization: token,
       },

   }

    axios
    .get('http://localhost:3400/users', requestOptions)
    .then(res => {
       this.setState({ users: res.data})
    })
    .catch(err => {
        console.error('Axios failed')
    });

    console.log('state', this.state)
}


}

export default Users;
