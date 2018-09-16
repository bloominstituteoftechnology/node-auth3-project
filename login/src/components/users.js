import React, { Component } from 'react';
import axios from 'axios';



 class Users extends Component {
  state = {
    users: [],
  };
   render() {
    return (
      <div>
          <ul>
              {this.state.users.map(user => (
              <li key={user.id}>{user.username}</li>
              ))}
          </ul>
      </div>
    );
  }
   componentDidMount() {
    const token = localStorage.getItem('jwt');
    const reqOptions = {
        headers: {
            Authorization: token,
        },
    };
     axios
        .get('http://localhost:3000/api/users', reqOptions)
        .then(res => {
            console.log('users data:', res.data);
            this.setState({ users: res.data });
        })
        .catch(err => {
            console.error('Axios Failed', err ); 
            this.props.history.push('/signin');
        });
    
  };
}
 export default Users;