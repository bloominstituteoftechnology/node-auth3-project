import React, { Component } from 'react';
import axios from 'axios';

export default class UsersListPg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    authenticate = () => {
        
    }
    
    componentDidMount() {
        const token = localStorage.getItem('token');
        const options = {
            headers: {
                authorization: token
            }
        }
        if (token) {
            axios.get('http://localhost:5000/api/users', options)
                .then(response => {
                    console.log(response);
                    this.setState({ users: response.data });
                })
                .catch(err => {
                    console.log(err);
                });
        } else {

        }
    }

    render() {
        return (
            <div className='usersListContainer'>
                <ul>
                    {this.state.users.map(user => {
                     return <li key={user.id}>{user.username}</li>
                    })}
                </ul>
            </div>
        );
    }
}