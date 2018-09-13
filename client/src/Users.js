import React, { Component } from 'react';
import axios from 'axios';


class Users extends Component {
    state = {
        users: [],
    };

    render () {
        return (
        <div>
            <ul>
                {this.state.users.map(user => (
                    <li key = {user.id}>{user.username}, {user.department} </li>
                ))}
            </ul>
        </div> 
        );
    }


    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const resOptions = {
            headers: {
                Authorization: token,
            },
        };

        axios
        .get('http://localhost:9000/api/users', resOptions)
        .then(res => {
            this.setState({users: res.data});
        })
        .catch(err => {
            console.error('Axios Error:', err);
            this.props.history.push('/signin');
        });
    }
}

export default Users;