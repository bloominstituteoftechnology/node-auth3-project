import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";

export class UsersList extends Component {

    constructor() {
        super();
        this.state = {
            users: []
        };
    }
    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const options = {
            headers: {
                Authorization: token
            }
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
                <NavLink to='/login'>
                    <button onClick={this.handleSignout}>Sign Out</button>
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