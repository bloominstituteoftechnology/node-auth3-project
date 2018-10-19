import React, { Component } from 'react';
import axios from 'axios';

import LoginForm from '../LoginForm';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    loginHandler = (event) => {
        event.preventDefault();

        let user = this.state;

        axios
            .post('http://localhost:8000/api/login', user)
            .then(response => {
                localStorage.setItem('jwt', response.data.token);
                this.props.history.replace('/users');
            })
            .catch(() => {
                console.log("ERROR: unable to login (client side).")
            });
    }

    changeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return(
            <LoginForm 
                {...this.props}
                loginHandler={this.loginHandler}
                changeHandler={this.changeHandler}
            />
        );
    }
}

export default LoginView;