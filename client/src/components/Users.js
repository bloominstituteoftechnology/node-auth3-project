import React, { Component } from 'react';
import axios from 'axios';

const endPoint = 'http://localhost:5000/api/';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        const endpoint = `${endPoint}users`;

        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                authorization: token,
            },
        };

        axios
            .get(endpoint, requestOptions)
            .then(res => this.setState({ users: res.data.users }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <ul>
                    {this.state.users.map(u => (
                        <li key={u.id}>{u.username}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Users;
