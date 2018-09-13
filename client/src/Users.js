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
                    <li key = {user.id}>{user.username}</li>
                ))}
            </ul>
        </div> 
        );
    }


    componentDidMount() {

        

        axios
        .get('http://localhost:9000/api/users')
        .then(res => {
            this.setState({users: res.data});
        })
        .catch(err => {
            console.error('Axios Error:', err);
        });
    }
}

export default Users;