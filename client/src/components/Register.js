import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form``
const Input = styled.input``
const Text = styled.p``


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                department: ''
            }
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.history.replace('/users')
        }
    }

    changeHandler = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    }

    submitHandler = async (event, user) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/register', user);
            const token = response.data;
            localStorage.setItem('token', token);
            this.props.history.push('/users');
        } catch (error) {
            console.log(error);
        }
    }


    render() { 
        const LinkToLogin = <Link to='/login'>Login</Link>
        return ( 
            <Form className="login-form" onSubmit={(e) => this.submitHandler(e, this.state.user)}>
                <Input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    required
                    onChange={this.changeHandler}
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    required
                    onChange={this.changeHandler}
                />

                <Input
                    name="department"
                    type="text"
                    placeholder="Department"
                    value={this.state.department}
                    required
                    onChange={this.changeHandler}
                />

                <div>
                    <button type="submit">Sign Up</button>
                    <Text>Already have an account? {LinkToLogin}</Text>
                </div>
            </Form>
         );
    }
}
 
export default Register;
