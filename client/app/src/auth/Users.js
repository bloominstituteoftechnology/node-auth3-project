import React, { Component } from 'react';
import axios from 'axios';


class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('jwtToken');

        const reqOptions = {
            headers: {
                Authorization: token
            }
        };

        axios
            .get('http://localhost:8000/users', reqOptions)
            .then(res => {
                this.setState({ users: res.data })
            })
            .catch(err => {
                console.error('Failed to retrieve Users data')
            })
    }

    logoutHandler = e => {
    localStorage.removeItem('jwtToken');
    }


    render() {
        return (
            <div className='users'>
                <ul>
                    {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
                </ul>
                <button onClick={this.logoutHandler}>Logout</button>
            </div>
        )
    }
}

export default Users;