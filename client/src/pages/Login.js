import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class Login extends Component {
    state = {};

    updateFormInfo = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    logIn = event => {
        event.preventDefault();
        console.log("in function");

        axios({
            url: "http://localhost:3300/api/login",
            data: {
                username: this.state.username,
                password: this.state.password
            },
            method: "post"
        }).then(res => {
            console.log(res.data.token);
            localStorage.setItem("token", res.data.token);
        });
    }

    render() {
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