import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    };

componentDidMount() {
    console.log('comp did mount')
    const token = localStorage.getItem('jwt')
    const endpoint = 'http://localhost:5000/api/users';
    const options = {
        headers: {
            Authorization: token
        }
    };

    axios.get(endpoint, options)
    .then(res => {
        this.setState({users: res.data})
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}
    render() {
        return (
            <div>
                <ul>
                {this.state.users.map(user => (
                    <li key={user.id}>{user.username}&nbsp;&nbsp;{user.department}</li>
                ))}
                </ul>
            </div>
        )
    }
};

export default Users;