import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            userlist: undefined
        }
    }

    render() {
        console.log(this.state.userlist);
        if (this.state.userlist !== undefined) {
            return (
                <div>
                    <h2>Users</h2>
                    <ul>
                    {this.state.userlist.map(user => {
                        return <li key={user.username}>{user.username} - {user.department}</li>
                    })}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div>Nothing to see here.</div>
            )
        }
    }

    setUsers = (data) => {
        this.setState({
            userList: data,
        });
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const options = {
            headers: {
                Authorization: token,
            }
        }
        axios.get('http://localhost:3300/api/users', options)
        .then((res) => {
            console.log(res.data);
            this.setState({
                userlist: res.data,
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export default Users;