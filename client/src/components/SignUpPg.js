import React, { Component } from 'react';
import axios from 'axios';

export default class SignUpPg extends Component {
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
        // endpoint is /api/register as defined in index.js of server
        axios.post('http://localhost:5000/api/register', this.state.user)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className='signUpForm'>
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