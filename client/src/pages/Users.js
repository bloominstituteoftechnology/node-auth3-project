import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

class Users extends Component {
    state = {
        authorized: false,
        users: [],
        loggedOut: false
    };

    componentDidMount() {
        axios({
            url: "http://localhost:3300/api/users",
            headers: {"Authorization": localStorage.getItem("token")},
            method: "get"
        }).then(res => {
            this.setState({
                authorized: true,
                users: res.data
            });
        });
    };

    logOut = event => {
        localStorage.setItem("token", "");
        this.setState({
            loggedOut: true
        });
    }

    render() {
        if (this.state.loggedOut)
            return <Redirect to="/login" />

        return (
            <div>
                <button onClick={this.logOut}>{
                    this.state.authorized ? "Log Out" : "Log In"
                }</button>
                {this.state.authorized ? (
                    this.state.users.map(user => (
                        <div>
                            <h3>{user.username}</h3>
                            <p>Password: {user.password}</p>
                            <p>Department: {user.department}</p>
                        </div>
                    ))
                ) : (
                    "You must be logged in to view this page."
                )}
            </div>
        );
    };
};

export default Users;