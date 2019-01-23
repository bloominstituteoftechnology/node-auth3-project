import React, { Component } from 'react';

export class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <div className="App">
                        <div className="login-container">
                            <div className="login-box">
                                <p className="title">Log In Here</p>
                                <form onSubmit={this.handleSubmit} className="loginInput">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleInput}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleInput}
                                    />
                                </form>
                                <button onClick={this.handleSubmit} className="login-button">Log in</button>
                            </div>
                        </div>
            </div>
        )
    }
}

export default LogIn;
