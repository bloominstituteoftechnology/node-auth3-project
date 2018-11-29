import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LogInPg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        }
    }

    changeHandler = event => {
        console.log('event.target.name', event.target.name);
        this.setState({ user: {...this.state.user, [event.target.name]: event.target.value }});
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