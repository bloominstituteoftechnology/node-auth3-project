import React, { Component } from 'react';

class Users extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        return (
            <ul>
                {this.props.users.map(user => (
                    <li key={Math.random() * 100}>{user.username}</li>
                ))}
            </ul>
        )
    }
}

export default Users;