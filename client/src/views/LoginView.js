import React, { Component } from 'react';
import axios from 'axios';

import Home from '../components/Home';

class LoginView extends Component {
    constructor(props) {
        super(props);
    
    state = {
        username: '',
        password: '',
    };
}
handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
}

handleSubmit = (event) => {
    event.preventDefault();

    const endpoint = 'http://localhost:8989/api/login';

    axios
        .post(endpoint, this.state)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.error('ERROR', err);
        });

}

render() {
    return (
        <Login {...props} handleSubmit={this.handleSubmit} />
    )
}

}

export default LoginView;