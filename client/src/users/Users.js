import React from 'react';
import axios from 'axios';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        // get the token
        const token = localStorage.getItem('jwt');
        // attach the token as the auth header
        const requestOptions = {
            headers: {
                Authorization: token
            },
        }

        axios.get('http://localhost:3300/api/users', requestOptions)
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <ul>
                {this.state.users.map(user => <li key={user.username}><p>{user.username}</p><p>{user.department}</p><p>{user.password}</p></li>)}
            </ul>
        )
        
    }
}

export default Users;