import React, { Component } from 'react';
import axios from 'axios';

import Login from '../components/Login';

class LoginView extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        username: '',
        password: '',
    };

handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
};

handleSubmit = (event) => {
    event.preventDefault();

    const endpoint = 'http://localhost:8989/api/login';
    console.log(this.state);
    axios
        .post(endpoint, this.state)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('jwt', res.data.token);
            this.props.history.push('/');
        })
        .catch(err => {
            console.error('ERROR', err);
        });

}

render() {
    return (
        <Login {...this.props} 
        handleSubmit={this.handleSubmit} 
        handleChange={this.handleChange} />
    )
}

}

export default LoginView;