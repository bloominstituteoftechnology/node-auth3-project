import React, { Component } from 'react';
import axios from 'axios';
const initialUser = {
    username: '',
    password: '',
}
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: '',
        }
    }

    submitHandler = () => { }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.user.username}
                        onChange={this.inputHandler}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={this.state.user.password}
                        onChange={this.inputHandler}
                    />
                </form>
                {this.state.message
                    ? (<h4>{this.state.message}</h4>)
                    : undefined
                }
            </div>
        );
    }
}