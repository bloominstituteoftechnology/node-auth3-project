import React, { Component } from 'react';
import axios from "axios";

class Register extends Component {
    state = {};

    updateFormInfo = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    registerUser = event => {
        event.preventDefault();

        axios({
            url: "http://localhost:3300/api/register",
            data: {
                username: this.state.username,
                password: this.state.password,
                department: this.state.department
            },
            method: "post"
        }).then(res => {});
    }

    render() {
        return (
            <div>
                <form>
                    <input onChange={this.updateFormInfo} type="text" placeholder="username" id="username" />
                    <input onChange={this.updateFormInfo} type="password" placeholder="password" id="password" />
                    <input onChange={this.updateFormInfo} type="text" placeholder="department" id="department" />
                    <input onClick={this.registerUser} type="submit" value="Register" />
                </form>
            </div>
        );
    };
};

export default Register;