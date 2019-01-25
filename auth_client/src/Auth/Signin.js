import React, { Component } from "react";

class Signin extends Component {
    state = {
        username: "",
        password: ""
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        type='text'
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        type='text'
                    />
                </div>
                <div>
                    <button type='submit'>Sign In</button>
                </div>
            </form>
        );
    }
}

export default Signin;
