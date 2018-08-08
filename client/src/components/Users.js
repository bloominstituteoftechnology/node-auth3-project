import React from 'react';
import axios from 'axios';
import User from './User';

class Users extends React.Component {
    constructor() {
        super();

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:8000/api/users', { headers: { Authorization: token } })
                .then(response => this.setState({ users: response.data }))
                .catch(err => console.log(err.response));
        } else {
            this.props.history.push('/login');
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                <button onClick={this.logout}>Log Out</button>
                {this.state.users.length === 0 ? <h1>No users registered!</h1> : this.state.users.map(user => <User key={user.id} user={user} />)}
            </div >
        );
    }
}

export default Users;