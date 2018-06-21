import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserList extends Component {
    render() {
        return (
            <div>
                List of Users
                <button><Link to='/'>Sign out</Link></button>
            </div>
        );
    }
}

export default UserList;