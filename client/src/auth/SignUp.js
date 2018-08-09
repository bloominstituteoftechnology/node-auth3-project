import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        department: ''
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log('register');

        axios.post(`http://localhost:8000/api/register`, this.state)
            .then(res => {
                console.log(res);
                const token = res.data;
                localStorage.setItem('jwt', token);
            })
            .catch(err => console.log(err));
        
        this.props.history.push('/users');
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
                <button type="submit">Submit</button>
            </div>
        );
    }
}

export default SignUp;
