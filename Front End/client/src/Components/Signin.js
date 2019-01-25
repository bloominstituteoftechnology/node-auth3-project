import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        

        };
    }
    logIn = e => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/login', this.state)
            .then((res) => {
                localStorage.setItem('jwt', res.data.token);
                this.props.history.push('/users')
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div >
                <h2>Log in:</h2>
                <form onSubmit={this.logIn}>
                    <input
                        onChange={this.handleInputChange}
                        placeholder="username"
                        name="username"
                    />
                    <input
                        onChange={this.handleInputChange}
                        placeholder="password"
                        name="password"
                    />
                    <button type="submit">Log in</button>
                </form>
            </div>
        );
    }
}


export default SignIn

