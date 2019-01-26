import React, {Component} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";

class Login extends Component {
    state = {
        loggedIn: false
    };

    updateFormInfo = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    logIn = event => {
        event.preventDefault();

        axios({
            url: "http://localhost:3300/api/login",
            data: {
                username: this.state.username,
                password: this.state.password
            },
            method: "post"
        }).then(res => {
            localStorage.setItem("token", res.data.token);
            this.setState({
                loggedIn: true
            });
        });
    }

    render() {
        if (this.state.loggedIn)
            return <Redirect to="/users" />

        return (
            <div>
                <form>
                    <input onChange={this.updateFormInfo} type="text" placeholder="username" id="username" />
                    <input onChange={this.updateFormInfo} type="password" placeholder="password" id="password" />
                    <input onClick={this.logIn} type="submit" value="Log In" />
                </form>
                <Link to="/signup">New User? Register Here.</Link>
            </div>
        );
    };
};

export default Login;