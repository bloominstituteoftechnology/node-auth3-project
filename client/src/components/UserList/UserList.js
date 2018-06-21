import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class UserList extends Component {
    render() {
        return (
            <div className='container'>
            <div className='top-section'>
                <h2 className='user-header'>List of Members</h2>
                <p className='sign-out'><Link to='/'>Sign out</Link></p>
            </div>
            </div>
        );
    }
}

export default UserList;