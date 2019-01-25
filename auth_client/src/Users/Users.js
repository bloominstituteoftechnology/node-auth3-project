import React, { Component } from 'react';
import axios from 'axios'

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount = () => {
        const token = localStorage.getItem('jwt')
        const endpoint = 'http://localhost:3300/api/users'
        const options = {
            headers: {
                Authorization:token
            }
        }
        this.forceUpdate();
        axios.get(endpoint, options)
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => {
                console.log('error', err)
            })

    }
    render() {
        return (
            <div>
    <h2>Users List </h2>
                {this.state.users.map(user => (
                    <li key={user.id}>{user.username}</li>))}
            </div>
        )
    }
}



export default Users;