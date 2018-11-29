import React, { Component } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
    username: '',
    password: '',
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: '',
        };
    };


    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: { ...this.state.user, [name]: value } });
    };

    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${url}/api/login`, this.state.user)
            .then((res) => {
                if (res.status === 200) {

                }
            })
    }




    render() {
        return (
            <div></div>
        )
    }
};

export default Login;