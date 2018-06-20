import React, { Component } from 'react';
import axios from 'axios';


class Users extends Component {
    state = {
        users: [],
    }

componentDidMount () {
    const token = localStorage.getItem('jwt');

    const requestOptions = {
        headers: {
            Authorization: token,
        },
    };
    axios
        .get('http://localhost:5500/api/users', requestOptions)
        .then(response => {
            this.setState({ users: response.data });
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        })
}

    render() {
        return (
            <ul>{this.state.users.map(user => {
               return  <li key={user._id}>{user.username}</li>
            })}</ul>
        );
    }
}

export default Users;