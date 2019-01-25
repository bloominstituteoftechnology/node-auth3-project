import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            department: '',

        };
    }
    addUser = e => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/register', this.state)
            .then((res) => {
                localStorage.setItem('jwt',res.data.token);
                this.props.history.push('/users')
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div >
                <h2>Create New User:</h2>
                <form onSubmit={this.addUser}>
                    <input
                        onChange={this.handleInputChange}
                        placeholder="username"
                        name="username"
                    />
                    <input
                        onChange={this.handleInputChange}
                        placeholder="password"
                        name="password"
                    />
                    <input
                        onChange={this.handleInputChange}
                        placeholder="department"
                        name="department"
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
        );
    }
}


export default SignUp

