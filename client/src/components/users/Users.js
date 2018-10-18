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
            console.log(res.data);
            this.setState({ users: res.data, error: '' });
        }).catch(err => {
            console.log('USERS ERROR', err);
            this.setState({error: 'You Are Unauthorized To View This Data'});
        });
    };
}

export default Users;