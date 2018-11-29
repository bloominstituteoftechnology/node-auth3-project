import React, { Component } from 'react';
import axios from 'axios';

export default class LogInPg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                department: 'test'
            }
        }
    }

    changeHandler = event => {
        this.setState({ user: {...this.state.user, [event.target.name]: event.target.value }});
    }

    submitHandler = event => {
        event.preventDefault();
        // send axios call with user to server
        axios.post('http://localhost:5000/api/login', this.state.user)
            .then(response => {
                if (response.status === 200 && response.data) {
                    localStorage.setItem('token', response.data.token);
                    this.props.history.push('/api/users');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className='logInForm'>
                <form onSubmit={this.submitHandler}>
                    <input 
                        placeholder="Enter username" 
                        type="text"
                        onChange={this.changeHandler}
                        name="username"
                        value={this.state.user.username} />
                    <input 
                        placeholder="Enter password" 
                        type="text"
                        onChange={this.changeHandler}
                        name="password"
                        value={this.state.user.password} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}