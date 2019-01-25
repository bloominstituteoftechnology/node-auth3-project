import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {

    render() {
    return (
        <div>
            <h2>Users</h2>
        </div>
    )
    }

    componentDidMount() {
        axios.get('http://localhost:3300/api/users')
        .then((data) => {
            console.log(data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export default Users;