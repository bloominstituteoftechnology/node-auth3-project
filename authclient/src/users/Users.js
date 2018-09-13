import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const reqOptions = {
            headers: {
                Authorization: token,
            }
        };

        axios
            .get('http://localhost:8000/api/users', reqOptions)
            .then(res => {
                console.log(res);
                this.setState({ users: res.data })
            })
            .catch(err => {
                console.error('Axios Error: ', err);
            })
    }

    render() {
      return (
        <div>
            <ul>
                {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
            </ul>
        </div>
      );
    }
  }

  export default Users;