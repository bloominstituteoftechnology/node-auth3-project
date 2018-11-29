import React, { Component } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
    username: '',
    password: '',
    department: ''
}

export default class Signup extends Component {


    render() {
        return (
            <div>
                <form>
                    <label htmlFor='username'></label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={this.state.user.username}
                        onChange={this.inputHandler}
                    />
                    <label htmlFor='password'></label>
                    <input
                        type='text'
                        id='password'
                        name='password'
                        value={this.state.user.password}
                        onChange={this.inputHandler}
                    />
                    <label htmlFor='department'></label>
                    <input
                        type='text'
                        id='department'
                        name='department'
                        value={this.state.user.department}
                        onChange={this.inputHandler}
                    />
                </form>
            </div>
        )
    }
}