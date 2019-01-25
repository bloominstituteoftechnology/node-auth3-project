import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
        if (!localStorage.getItem('jwt')) {
            return (
                <Redirect to='/signin'></Redirect>
            )
        }
        if (this.state.userlist !== undefined) {
            return (
                <div>
                    <h2>Users</h2>
                    <ul>
                    {this.state.userlist.map(user => {
                        return <li key={user.id}>{user.username} - {user.department}</li>
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
        if (token !== null) {
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
}

export default Users;