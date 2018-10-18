import React, { Component } from 'react';
import axios from 'axios';


class Users extends Component {
    state = {
        users: []
    };
  render() {
    return (
      <div>
        <ul>
          {/* Creates a user from users */}
            {this.state.users.map(user => (
                <li key ={user.id} className='list-item'>{user.username}</li>
            ))}
        </ul>
      </div>
    );
  }
 
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token,
      },
    };
   
    axios
      .get("http://localhost:9001/users", reqOptions)
      .then( res => {
        this.setState({ users: res.data});
      })
      .catch(err => {
          console.error('Axios Error:',err);
      });
    
  };
}

export default Users;