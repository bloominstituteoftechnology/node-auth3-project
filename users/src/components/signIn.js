import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
        username: '',
        password: '',
    };
}
    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    signIn = event => {
        event.preventDefault();
        const { username, password } = this.state;
        const info = { username, password };
        axios
            .post(`http://localhost:5500/api/login`, info)
            .then(response => {
                console.log(response);
                localStorage.setItem("jwt", response.data.token);
                this.props.history.push("/users");
            })
            .catch(error => console.error("Error:", error));

        this.setState({
            username: "",
            password: ""
        });
    };
    render() {
        return (
            <div style={{ marginTop: 30 + "px" }}>
                <h1>SIGN IN PAGE</h1>
                <form onSubmit={this.signIn}>
                    <input
                        onChange={this.handleInputChange}
                        placeholder="username"
                        value={this.state.username}
                        name="username"
                        type="text"
                    />
                    <input
                        onChange={this.handleInputChange}
                        placeholder="password"
                        value={this.state.password}
                        name="password"
                        type="password"
                    />
                    <button type="submit">Sign In</button>
                </form>
            </div>
        );
    }
}

export default SignIn;