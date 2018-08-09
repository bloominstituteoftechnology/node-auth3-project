import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();

        axios.post(`http://localhost:8000/api/login`, this.state)
            .then(({data}) => {
                const token = data.token;
                localStorage.setItem('jwt', token);
                this.props.history.push('/users');
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
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                </form>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default SignIn;
