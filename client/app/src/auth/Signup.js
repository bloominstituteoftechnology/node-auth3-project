import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        }
    }


    inputChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitUser = e => {
        e.preventDefault;

        axios
            .post('http://localhost:3000/register', this.state)
            .then(res => {
                const token = res.data;
                localStorage.setItem('jwtToken', token);
            })
            .catch(err => {
                console.error('Sign-Up failed')
            })
        this.setState({ username: '', password: '' })
    }

    render() {
        return (
            <div>
                <h1>Welcome! Please sign-up:</h1>
                <form onSubmit={this.submitUser} >
                    <div>
                        <label htmlFor='username'></label>
                        <input
                            type='text'
                            placeholder='username' 
                            value={this.state.username}
                            onChange={this.inputChangeHandler} 
                            name='username'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'></label>
                        <input
                            type='text'
                            placeholder='password'
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            name='password'
                        />
                    </div>
                    <button>Signin</button>
                </form>
            </div>
        )
    }

}

export default Signup;