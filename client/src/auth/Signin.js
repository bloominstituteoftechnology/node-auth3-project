import React, { Component } from 'react';
import axios from 'axios';
import './Signin.css';


class Signin extends Component {
    state= {
        username: '',
        password: ''
    }
    render() {
        return (
            <div className="Signin">
                <h1> Sign in Component </h1>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input 
                            value={this.state.username}
                            onChange={this.inputChangeHandler} 
                            type="text" 
                            name="username"/>
                    </div>
                    <div>
                        <input 
                            value={this.state.password} 
                            onChange={this.inputChangeHandler} 
                            type="password" 
                            name="password" />
                    </div>
                    <div>
                        <button type="button">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    submitHandler = event => {
        event.preventDefault();

        axios.post('http://localhost:3300/login', this.state).then(res => {
            const token = res.data;

            localStorage.setItem('jwt', token);

        })
        .catch(err => {
            console.error('Error in registering');
        })

        
    }
}

export default Signin;