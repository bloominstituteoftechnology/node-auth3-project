import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    state = {
        username: '',
        password: ''
    }
    
    submitHandler = event => {

            event.preventDefault();

            axios
                .post('http://localhost:5500/api/auth/login', this.state)
                .then(response => {
                    localStorage.setItem('jwt', response.data.token);
                    this.props.history.push('/users');
                    console.log('signing props', this.props)
                })
                .catch(error => console.log('grumpy goose'))
        }
    
    inputChangeHandler = event => {
        console.log('Change', event.target.name);
        const { name, value } = event.target;
    
        this.setState({ [name]: value })
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div>
                    <label>Username</label>
                    <input 
                        value={this.state.username} 
                        onChange={this.inputChangeHandler}
                        name='username' 
                        type='text' />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        value={this.state.password} 
                        onChange={this.inputChangeHandler}
                        name='password' 
                        type='password' />
                </div>
                <div>
                    <button type='submit'>Signin</button>
                </div>
            </form>
        );
    }


}



export default Signin;