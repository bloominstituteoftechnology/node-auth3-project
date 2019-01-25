import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {

    state = {users: []}

    render() {
        return (
            <div>
                <h2>List of Users</h2>
                <ul>
                    {this.state.users.map(user => (
                    <li key={user.id}>{user.username} - {user.department}</li>
                    ))}
                </ul>
            </div>
        )
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const endpoint = 'http://localhost:5112/api/users';
        const options = {
            headers: {
                Authorization: token
            }
        }

        axios.get(endpoint, options)
        .then(res => {
            this.setState({ users: res.data })
            console.log(res.data)
        }).catch(err => {
            console.log('err', err)
        })
    }
}

export default Users;