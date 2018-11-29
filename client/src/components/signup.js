import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                username: '',
                password: '',
                department: ''
            },
        };
    }

    registration = (ev) => {
        ev.preventDefault();
        return axios
        .post('http://localhost:9000/api/register', this.state.userInfo)
        .then((res) => {
            if(res.status === 201 && res.data) {
                window.location = "/users"
                localStorage.setItem('user-token', res.data);
            }
        })
        .catch(err => console.log(err))
    }

    inputChangeHandler = (ev) => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [ev.target.name]: ev.target.value
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.registration}>
                    <input type='text' placeholder='Username' name='username' onChange={this.inputChangeHandler}/>
                    <input type='text' placeholder='Password' name='password' onChange={this.inputChangeHandler}/>
                    <input type='text' placeholder='Department' name='department' onChange={this.inputChangeHandler}/>
                        <button onClick={this.registration}>Register</button>
                </form>
            </div>
        )
     }
}

export default SignUp;