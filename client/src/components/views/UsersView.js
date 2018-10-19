import React, { Component } from 'react';
import axios from 'axios';

import UserList from '../UserList';

class UsersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        const jwToken = localStorage.getItem('jwt');
        const jwtOptions = {
            headers: {
                Authorization: jwToken
            }
        }

        axios
            .get('http://localhost:8000/api/users', jwtOptions)
            .then(response => {
                this.setState({
                    users: response.data.users
                })
            })
            .catch(() => {
                console.log("ERROR: unable to fetch users (client side).")
            });
    }

    render() {
        console.log(this.state);

        if (this.state.users.length < 1) {
            return (
                <div>
                    <p>Unable to view users.</p>
                </div>
            );
        }

        else {
            return (
                <UserList
                    {...this.props}
                    submitHandler={this.submitHandler}
                    changeHandler={this.changeHandler}
                />
            );
        }
    }
}

export default UsersView;