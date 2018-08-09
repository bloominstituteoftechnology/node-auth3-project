import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();

        axios
            .post(`http://localhost:8000/api/login`, this.state)
            .then(res => {
                console.log(res);
                const token = res.data;
                localStorage.setItem('jwt', token);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                </form>
                <button type="submit">Submit</button>
            </div>
        );
    }
}

export default SignIn;
