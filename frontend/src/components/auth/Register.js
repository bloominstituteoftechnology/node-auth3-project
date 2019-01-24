import React from 'react';
import axios from 'axios';

class Register extends React.Component {

    state = {
        username: "",
        password: "",
        department: "",
        message: "",
    };

    handleUsername = event => {
        this.setState({ username: event.target.value });
    };

    handlePassword = event => {
        this.setState({ password: event.target.value });
    };

    handleDepartment = event => {
        this.setState({ department: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.username.length === 0 || this.state.password.length === 0 || this.state.department.length === 0) {
            this.setState({ message: "Must enter username, password, and department to register" });
        } else {
            this.setState({ message: "Registering..." });
            const creds = { 
                username: this.state.username, 
                password: this.state.password, 
                department: this.state.department 
            };
            axios.post('http://localhost:5000/api/auth/register', creds)
                .then(response => {
                    localStorage.setItem('jwt', response.data.token);
                    localStorage.setItem('username', response.data.username);
                    this.props.history.push("/users");
                })
                .catch(err => {
                    this.setState({ message: err.response.data.message });
                });
        }
    };

    render() {
        return (
            <>
                <div className="register-wrapper">
                    <form className="register-form" onSubmit={this.handleSubmit}>
                        <input
                            className="username-field"
                            text="text"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleUsername}
                        />
                        <input
                            className="password-field"
                            type="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handlePassword}
                        />
                        <input
                            className="department-field"
                            type="department"
                            placeholder="department"
                            value={this.state.department}
                            onChange={this.handleDepartment}
                        />
                        <button
                            className="register-button"
                            type="submit"
                            onClick={this.handleSubmit}>
                            Register
                    </button>
                    </form>
                </div>
                <div className="form-message">
                    {this.state.message}
                </div>
            </>
        )
    }
}

export default Register;