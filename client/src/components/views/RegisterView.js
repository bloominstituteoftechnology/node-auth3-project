import React, { Component } from 'react';
import axios from 'axios';

import RegisterForm from '../RegisterForm';

class RegisterView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            department: ''
        };
    }

    changeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        let user = this.state;

        axios
            .post('http://localhost:8000/api/register', user)
            .then(response => {
                localStorage.setItem('jwt', response.data.token);
                this.props.history.push('/users');
            })
            .catch(() => {
                console.log("ERROR: unable to register.");
            });
    }

    render() {
        return(
            <RegisterForm 
                {...this.props}
                submitHandler={this.submitHandler}
                changeHandler={this.changeHandler}
            />
        );
    }
}

export default RegisterView;