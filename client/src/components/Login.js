import React, { Component } from "react";
import axios from "axios";
class Login extends Component {
state = {
    username: "",
    password: ""
};
handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
};
handleSubmit = event => {
    event.preventDefault();
    const url = "http://localhost:8080/api/login";
    console.log("state", this.state);
    axios
    .post(url, this.state)
    .then(res => {
        console.log("res data", res.data);
        localStorage.setItem("jwtToken", res.data.token);
    })
    .catch(err => {
        console.log("ERROR", err);
    });
};
render() {
    return (
    <form onSubmit={this.handleSubmit}>
        <div>
        <label htmlFor="username">Username</label>
        <input
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
        />
        <label htmlFor="password">Password</label>
        <input
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
        />
        <button type="submit">Log in</button>
        </div>
    </form>
    );
}
}
export default Login;