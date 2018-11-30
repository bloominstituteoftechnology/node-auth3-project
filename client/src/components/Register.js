import React from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const initialUser = {
    username: "",
    password: ""
};

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: ""
        }
    }

    inputHandler = ev => {
        const { name, value } = ev.target;
        this.setState({ user: { ...this.state.user, [name]: value } });
    }

    submitHandler = ev => {
        ev.preventDefault();
        axios.post(`${url}/api/register`, this.state.user)
            .then(res => {
                if (res.status === 201) {
                    this.setState({
                        message: "Registration successful",
                        user: { ...initialUser }
                    });
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                this.setState({
                    message: "Registration failed",
                    user: { ...initialUser }
                });
            });
    }

    render() {
        return (
            <section>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={this.state.user.username}
                        onChange={this.inputHandler}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        id="password" 
                        name="password" 
                        value={this.state.user.password}
                        onChange={this.inputHandler} 
                    />
                    <button type="submit">Submit</button>
                </form>
                { this.state.message ? 
                    (<h4>{this.state.message}</h4>) : 
                    undefined }
            </section>
        );
    }
}