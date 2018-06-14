import React from 'react';
import axios from 'axios';

class Users extends React.Component {
    state = { users: []}
    render() {
        return (
        <ul>
            {this.state.users.map(user => {
                return (
                    <li key={user._id}>
                        {user.username}
                    </li>
                )
            })}
        </ul>
        )
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                Authorization: token,
            },
        };
        // 'http://localhost:5500/api/auth/login'
        axios.get('http://localhost:5500/api/users', requestOptions)
            .then(response => {
                this.setState({ users: response.data });
                console.log(response.data);
            })
            .catch(error => {
                console.log('testing');
            });
    }
}

export default Users;