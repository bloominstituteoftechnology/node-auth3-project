import React from 'react';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import './Register.css';

class Register extends React.Component {
    state = {
        username: '',
        race: '',
        password: '',
        redirect: null
    }

    submitHandler = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5500/api/auth/register', { username: this.state.username, race: this.state.race, password: this.state.password })
            .then(response => {
                this.setState({ redirect: true });
            })
            .catch(error => { alert(error.response.data) })
    };

    handleOnChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div><input name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleOnChange} required /></div>
                <div><input name="race" type="text" minLength="2" placeholder="Race" value={this.state.race} onChange={this.handleOnChange} required /></div>
                <div><input name="password" type="password" minLength="12" placeholder="Password" value={this.state.password} onChange={this.handleOnChange} required /></div>
                <div><button type="submit">Register</button></div>
                {this.state.redirect ? <Redirect to="/login" /> : null}
            </form>
        )
    }
};

export default withRouter(Register); 