import React, {Component} from 'react';
import axios from 'axios';

import Auth from '../auth/Auth';

class Users extends Component {
    state = {
        users:[]
    };

    render() {
        return (
            <>
                <h2>List of Users</h2>
                <ul>
                    {this.state.users.map(user => (
                        <li key={user.id}>{user.username}</li>
                    ))}
                </ul>
            </>
        )
    }
 componentDidMount() {
      axios.get('/api/users').then(res => {
            this.setState({ users: res.data })
        })   
    }    
}

export default Auth(Users);