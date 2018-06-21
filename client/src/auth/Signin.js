import React, { Component } from 'react';
import axios from "axios";

class Signin extends Component {
    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div>
                    <label>Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        name="username"
                        type="text"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        name="password"
                        type="password"
                    />
                </div>
                <div>
                    <button type="submit">Signin</button>
                </div>
            </form>
        );
    }

    submitHandler = event => {
        event.preventDefault();

        axios
            .post('http://localhost:5000/api/login', this.state)
            .then(response => {
                localStorage.setItem('jwt', response.data.token);

                console.log('signing props', this.props);
                this.props.history.push('/users');
            })
            .catch(err => console.log('bad panda!'));
    };

    inputChangeHandler = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };
}



export default Signin;