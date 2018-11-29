import React, { Component } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            users: []
        };
    }

    authenticateUser() {
        const token = localStorage.getItem('auth_token');
        const options = {
            headers: {
                authorization: token
            }
        };
        if (token) {
            axios.get(`${url}/api/users`, options)
                .then((res) => {
                    if (res.status === 200 && res.data) {
                        this.setState({ loggedIn: true, users: res.data });
                    } else {
                        throw new Error();
                    }
                })
                .catch((err) => {
                    this.props.history.push('/signin');
                });
            } else {
                this.props.history.push('/signin');
        }
    }

    componentDidMount() {
        this.authenticateUser();
    }

    render() {
        return (
            <p>this is something</p>
        );

    }
}
 
export default Users;