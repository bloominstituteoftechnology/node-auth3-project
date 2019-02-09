import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {

    render() {
        return (
            <div>
                <h2>List of Users</h2>
            </div>
        )
    }

    componentDidMount() {
        const endpoint = 'http://localhost:5500/api/users';

        axios.get(endpoint)
            .then(res => {
                console.log('data from /api/users', res.data);
            })
            .catch(err => {
                console.log('error from /api/users', err);
        })
    }

}

export default Users;