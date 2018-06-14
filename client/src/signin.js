import React, { Component } from 'react'
import axios from 'axios';

class Signin extends Component {
    state = {
        username: '',
        password: ''
    };

    render() {
        return (
            <div>
            <form onSubmit={ this.submitHandler }>
            {/* username form */}
                <div>
                <label>Username</label>
                <input 
                value={ this.state.username }
                onChange={ this.inputChangeHandler }
                name="username"
                type="text"
                />
                </div>
            
            {/* password form */}
                <div>
                <label>Password</label>
                <input 
                value={ this.state.password }
                onChange={ this.inputChangeHandler }
                name="password"
                type="password"
                />
                </div>
                <div>
                <button type="submit">Signin</button>
                </div>

            </form>
            </div>

        )
    }
    submitHandler = event => {
        event.preventDefault();

        axios
        .post('http://localhost:5500/api/auth/login', this.state) 
        .then(response => {
            console.log(response.data);
            localStorage.setItem('jwt', response.data.token)
            
            this.props.history.push('/users');
        })
        .catch(error => {
            console.log("error in fetching users");
        })
    };

    inputChangeHandler = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };
}

export default Signin;