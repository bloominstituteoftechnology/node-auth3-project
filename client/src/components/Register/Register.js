import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    state = {
        username: '',
        password: '',
        race: ''
    }

    submitHandler = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5500/api/auth/register', this.state)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log('Error!');
            })
    };

    handleOnChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div><label>UserName:</label><input name="username" type="text" value={this.state.username} onChange={this.handleOnChange} required /></div>
                <div><label>Race:</label><input name="race" type="text" min="2" value={this.state.race} onChange={this.handleOnChange} required /></div>
                <div><label>Password:</label><input name="password" type="password" min="12" value={this.state.password} onChange={this.handleOnChange} required /></div>
                <div><button type="submit">Register</button></div>
            </form>
        )
    }
}

export default Register; 