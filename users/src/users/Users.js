import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [],
  };

  render() {
    if (!this.state.users || !this.state.users.length) {
      return (
          <div><h1>Access Denied</h1>
              <h3>You do not have access to this information.</h3>
              <p>Please sign in.</p></div>
      )
  }

    return (
      <div>
        <h2>List of Users</h2>
        <ul>
        
       {this.state.users.map(u => (
            <div key={u.id}>
            <p>Alias: {u.username}</p>
            <p>Department: {u.department}</p>
            </div>
            
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const dept = localStorage.getItem('dept');
    console.log("dept", dept);
    

    const endpoint = 'http://localhost:3300/api/users';
    const options = {
      headers: {
        Authorization: token,
      },
    };
    
    axios
      .get(endpoint, options)
      .then(res => {
        const byDept = res.data.users.filter(u => u.department.includes(dept));
        this.setState({ users: byDept }, () => console.log("this.state", this.state));
        
        console.log();
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  }
}

export default Users;
