import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            department: ''
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register', this.state)
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
                    <div>
                        <input
                            type="text"
                            name="department"
                            placeholder="department"
                            value={this.state.department}
                            onChange={this.handleChange}
                        />
                    </div>
                </form>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default SignUp;
