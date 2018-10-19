import React, { Component } from 'react';
import axios from 'axios';

import Register from '../Register';

class RegisterView extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: '',
        password: '',
        department: ''
    };

    changeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    submitHandler = (event) => {
        event.preventDefault();

        axios
            .post('http://localhost:3000/register', this.state)
            .then(response => {
                localStorage.setItem('jwt', response.data.token);
                this.props.history.push('/users');
            })
            .catch(() => {
                console.log("ERROR: unable to register.");
            });
    }

    render() {
        console.log(this.props);
        return(
            <Register 
                {...this.props}
                submitHandler={this.submitHandler}
                changeHandler={this.changeHandler}
            />
        );
    }
}

export default RegisterView;