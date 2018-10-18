import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        users: [],
    };
    

    componentDidMount() {
        const token = localStorage.getItem("jwt");
        console.log(token);
        const reqOptions = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios
            .get("http://localhost:5500/api/users", reqOptions)
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(error => console.error("Error:", error));
    }

    render() {
        return (
            <div style={{ marginTop: 30 + "px" }}>
                <h1>USERS PAGE</h1>
                <ul />
                {this.state.users.map(user => (
                    <li key={user.id}>
                        {user.username}, member of {user.department} team
          </li>
                ))}
            </div>
        );
    }
}

export default Users;