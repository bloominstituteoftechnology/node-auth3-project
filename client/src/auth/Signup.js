import React, { Component } from 'react';
import axios from 'axios';
import './signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            race: ''
         }
    }

    inputChangeHandler = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    submitHandler = event => {
        event.preventDefault();

        axios
            .post('http://localhost:5500/api/auth/register', this.state)
            .then(response => {
                console.log('response', response)
                this.props.history.push('/signin');
            })
            .catch(err => {
                console.error("There was an error logging in", err.message);
            })
    };

    render() { 
        return ( 
            <div className="form">
                <form className="signup-form" onSubmit={this.submitHandler}>
                    <div>
                        <label>Username: </label>
                        <input
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            name="username"
                            type="text"
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            name="password"
                            type="password"
                        />
                    </div>
                    <div>
                        <label>Race: </label>
                        <input
                            value={this.state.race}
                            onChange={this.inputChangeHandler}
                            name="race"
                            type="text"
                        />
                    </div>
                    <div>
                        <button type="submit">Sign up</button>
                    </div>
                </form>
            </div>
         )
    }
}
 
export default Signup;