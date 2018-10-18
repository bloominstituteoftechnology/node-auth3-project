import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
    state = {
        users: [],
        error: null,
        isError: false,
    };

    render() {
        return (
            <div>
                <h1>List of Users</h1>
                <h2>{this.state.isError ? `You are not authorized to view this page.` : ''}</h2>
                <span>{this.state.isError ? <NavLink to="/register">Register</NavLink> : ''} {this.state.isError ? 'Or' : ''} {this.state.isError ? <NavLink to="/login">Login</NavLink> : ''}</span>
                <ul>
                    {this.state.users.map(u => (<li key={u.id}>{u.username}</li>))}
                </ul>
            </div>
        );
    };

    componentDidMount() {
        this.fetchUsers();
    };

    fetchUsers() {
        const token = localStorage.getItem('jwt');

        const endpoint = 'http://localhost:4000/api/users';
        const options = {
            headers: {
                Authorization: token
            }
        };

        axios.get(endpoint, options).then(res => {
            this.handleUsers(res.data);
        }).catch(err => {
            console.log('USERS ERROR', err.response.data.message);
            this.setState({error: err.response.data.message, isError: true});
        });
    };

    handleUsers = (arr) => {
        console.log('Users', this.props.department);
        const users = arr.filter(user => user.department === this.props.department);
        this.setState({users, error: '', isError: false});
    }
}

export default Users;