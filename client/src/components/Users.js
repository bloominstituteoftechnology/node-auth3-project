import React from 'react';
import axios from 'axios';
import User from './User';

class Users extends React.Component {
    constructor() {
        super();

        this.state = {
            users: [],
            loggedin: false,
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:8000/api/users', { headers: { Authorization: token } })
                .then(response => this.setState({ users: response.data, loggedin: true }))
                .catch(err => console.log(err.response));
        } else {
            this.props.history.push('/login');
        }
    }

    logout = () => {
        axios
            .get('http://localhost:8000/api/logout')
            .then(() => window.location.reload())
            .catch(err => console.log(err.response));
    }

    render() {
        console.log(axios.defaults)
        if (!this.state.loggedin) {
            return (
                <div>
                    <p>You need to be logged in to view this!</p>
                    <button onClick={() => this.props.history.push('/login')}>Login</button>
                    <button onClick={() => this.props.history.push('/register')}>Register</button>
                </div>
            );
        }

        return (
            <div>
                <h1>Users</h1>
                <button onClick={this.logout}>Log Out</button>
                {this.state.users.map(user => <User key={user.id} user={user} />)}
            </div >
        );
    }
}

export default Users;