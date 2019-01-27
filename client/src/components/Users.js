import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/users', { withCredentials: true })
            .then(response => {
                console.log(response);

                if (response.status === 200 || response.status === 201) {
                    this.setState({ users: response.data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    logout = () => {
        axios.get('http://localhost:8080/auth/logout', { withCredentials: true })
            .then(response => {
                console.log(response);

                if (response.status === 200 || response.status === 201) {
                    this.props.history.push('/login')
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { users } = this.state;

        return (
            <div>
                {users.map(user => {
                    return (
                        <div>{user.user_name}</div>
                    );
                })}

                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default withRouter(Users);