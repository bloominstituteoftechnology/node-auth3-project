import React, { Component } from 'react';
import axios from 'axios';

import './Users.css';

class Users extends Component {
  state = {
    users: [],
  };

  render() {
    return (
        <div className="users">
            <ul>
                {this.state.users.map(user => (
                    <li key={ user.id } className="user-list">
                        username: { user.username }<br/>
                        department: { user.department }
                    </li>
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
        .get('http://localhost:3500/api/users', reqOptions)
        .then(res => {
            console.log('Users Data:', res);
            this.setState({ users: res.data });
        })
        .catch(err => {
            console.error('Axios respose:', err)
        })
  };
}

export default Users;