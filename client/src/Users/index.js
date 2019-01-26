import React from 'react';
import axios from 'axios';

class Users extends React.Component {
    state = {
        users: [],
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const endpoint = 'http://localhost:4500/api/users';
        const options = {
            headers: {
                Authorization: token
            }
        }

        axios.get(endpoint, options)
        .then( res => {
            this.setState({ users: res.data });
        })
        .catch (err => {
            console.log('error from /api/users', err);
        });
    };

    render() {
        return (
            <div>
                <h2> List of All Users:</h2>
                <ul>
                    {this.state.users.map(user => 
                        ( <li key = {user.id}> {user.username} </li>)
                    )}
                </ul>
            </div>
        )
    }
}

export default Users;