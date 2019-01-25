import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loggedOut: true
        };
    }
    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const options = {
            headers: {
                Authorization: token
            }
        }
        axios
            .get('http://localhost:4000/api/users', options)
            .then(response => {
                this.setState({ users: response.data, loggedOut: false });
            })
            .catch(error => {
                console.error('Server Error', error);
                this.setState({ error });
            });
    }
    logOut = () => {
        localStorage.removeItem('jwt');
        this.setState({ loggedOut: true });
        this.props.history.push('/')
    }
    render() {
        if (this.state.loggedOut) {
            return <p>Unauthorized Access Please Log in</p>
        }
        return (
            <div>
                <h2>Users:</h2>
                <div >
                    {this.state.users.map(user => {
                        return (
                            <div className= 'users' key={user.username}>
                                <p > Username: {user.username}</p>
                                <p> Department: {user.department}</p>
                            </div>
                        );
                    })}
                </div>
                <button onClick={this.logOut}>Log Out</button>
            </div>
        );
    }
}


export default Users;
