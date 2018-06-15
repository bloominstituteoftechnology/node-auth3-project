import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        users: [],
    };

    render() {
        return (
            <ul>
                {this.state.users.map(user => <li key={user._id}>{user.username}</li>)}
            </ul>
        );
    }

    componentDidMount() {
        // get the token from somewhere
        const token = localStorage.getItem('jwt');

        // attach the token as the Authorization header
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
            });
    }
}

export default Users;