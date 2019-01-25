import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";

export class UsersList extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            authenticated: null
        };
    }
    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const options = {
            headers: {
                Authorization: token
            }
        };
        if (token) {
            this.setState ({
                authenticated: true
            })
        };
        axios
            .get('http://localhost:2323/api/users', options)
            .then(res => {
                console.log(res.data);
                this.setState({
                    users: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        return (
            <div>
                <h2 className="title">All Users</h2>
                <NavLink to='/login' style={{color: 'white', textDecoration: 'none' }}>
                    <button onClick={this.handleSignout} className={this.state.authenticated ? 'display' : 'hide' }>Sign Out</button>
                    <p className={this.state.authenticated ? 'hide' : 'display'} >You are not logged in. Please click here to log in.</p>
                </NavLink>
                <h3>
                    {this.state.users.map(user => (
                        <p key={user.id}>{user.username}</p>
                    ))}
                </h3>
            </div>
        )
    }
    handleSignout = () => {
        localStorage.removeItem('jwt');
    }
}

export default UsersList;