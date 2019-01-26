import React, {Component} from "react";
import axios from "axios";

class Users extends Component {
    state = {
        authorized: false,
        users: []
    };

    componentDidMount() {
        axios({
            url: "http://localhost:3300/api/users",
            headers: {"Authorization": localStorage.getItem("token")},
            method: "get"
        }).then(res => {
            console.log("then");
            console.log(res);
            this.setState({
                authorized: true,
                users: res.data
            });
        });
    };

    render() {
        return (
            <div>
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