import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        users: [],
        error: null,
    };

    render() {
        return (
            <div>
                <h1>List of Users</h1>
                <h2>{!this.state.error === null || !this.state.error === '' ? `` : `${this.state.error}`}</h2>
                <ul>
                    {this.state.users.map(u => (<li key={u.id}>{u.username}</li>))}
                </ul>
            </div>
        );
    };

    componentDidMount() {
        const token = localStorage.getItem('jwt');

        const endpoint = 'http://localhost:4000/api/users';
        const options = {
            headers: {
                Authorization: token
            }
        };

        axios.get(endpoint, options).then(res => {
            this.setState({ users: res.data, error: '' });
        }).catch(err => {
            console.log('USERS ERROR', err.response.data.message);
            this.setState({error: err.response.data.message});
        });
    };
}

export default Users;