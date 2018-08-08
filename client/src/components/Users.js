import React from 'react';
import axios from 'axios';
import User from './User';

class Users extends React.Component {
    constructor() {
        super();

        this.state = {
            users: [],
            user: [],
            loggedIn: true,
            time: 5
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:8000/api/users', { headers: { Authorization: token } })
                .then(response => this.setState({ users: response.data.users, user: response.data.user }))
                .catch(err => console.log(err.response));
        } else {
            this.setState({ loggedIn: false })
            this.interval();
            this.timeout();
        }
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }

        if (this.interval) {
            clearTimeout(this.interval);
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    timeout = () => {
        setTimeout(() => {
            this.props.history.push('/login');
        }, this.state.time * 1000);
    }

    interval = () => {
        let timeLeft = this.state.time;
        setInterval(() => {
            timeLeft--;
            this.setState({ time: timeLeft })
            if (this.state.time <= 0) {
                clearInterval(this);
            }
        }, 1000);
    }

    render() {
        if (!this.state.loggedIn) {
            return <h3>You need to be logged in to view this page... Redirecting to login page in {this.state.time}</h3>
        }

        if (this.state.users.length === 0) {
            return <h1>No users registered!</h1>
        }

        return (
            <div>
                <h1>{this.state.users[0].department.toUpperCase()} - {this.state.user.username}</h1>
                <button onClick={this.logout}>Log Out</button>
                {this.state.users.map(user => <User key={user.id} user={user} />)}
            </div >
        );
    }
}

export default Users;