import React from 'react';

const initialUser = {
    username: '',
    password: ''
}

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            user: { ...initialUser },
            message: ''
        }
    }

    submitHandler = () => {
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.user.username}
                        placeholder="Username"
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={this.state.user.password}
                        placeholder="Password"
                    />
                    {this.state.message ? <h4>{this.state.message}</h4> : null}
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;