import React, { Component } from 'react';

export default class UsersListPg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className='usersListContainer'>
                <ul>
                    {this.state.usersList.map(user => {
                     return <li key={user.id}>{user.username}</li>
                    })}
                </ul>
            </div>
        );
    }
}