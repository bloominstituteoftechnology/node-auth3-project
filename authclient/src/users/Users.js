import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [],
  }
  render() {
    return (
      <div className="App">
        <h2>User Information:</h2>
        <ul>
          {this.state.users.map(userList => (
            <div className = "user-list"
            key={userList.id}
            >
              <h3>ID: { userList.id } <br/> Name: {userList.username}</h3>
              <h3>Department: {userList.department}</h3>
              <hr/>              
            </div>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount(){
    const token = localStorage.getItem('jwt');
    const endpoint = 'http://localhost:7777/api/users';
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios.get(endpoint, options)
    .then(res => {
      console.log(res.data);
      this.setState({ users: res.data })

    }).catch(err => {
      console.error('ERROR', err)
    });
  }
}

export default Users;