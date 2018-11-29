import React, { Component } from 'react';
import axios from 'axios';

const url = 'http://localhost:3900';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            users: [],
        };
    };

    authorization = () => {
        const token = localStorage.getItem('secret_bit_token');
        const options = {
            headers: {
                authorization: token,
            },
        };

        if (token) {
            axios
                .get(`${url}/api/users`, options)
                .then((res) => {
                    if (res.status === 200 && res.data) {
                        this.setState({ loggedIn: true, users: res.data });
                    } else {
                        throw new Error();
                    }
                })
                .catch((err) => {
                    this.props.history.push('/login');
                })
        } else {
            this.props.history.push('/login');
        }
    };

    componentDidMount() {
        this.authorization();
    };

    componentDidUpdate(prevProps) {
        const { pathname } = this.props.location;
        console.log(this.props);
        console.log(prevProps);
        if (pathname === '/users' && pathname !== prevProps.location.pathname) {
            this.authorization();
        }
    };


    submitHandler = (event) => {
        event.preventDefault();
       localStorage.removeItem('secret_bit_token')
       this.props.history.push('/login')
    };

    render() {
        return (
            <div>
                <button onClick= {this.submitHandler}>Sign Out</button>
                <h1>Users</h1>
                <ol>
                    {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
                </ol>
            </div>
        )
    }
};


export default Users;