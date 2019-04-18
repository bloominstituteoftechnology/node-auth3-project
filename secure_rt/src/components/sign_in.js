import React, {Component} from 'react';
import { Button, Form, Input } from 'reactstrap';
import Loader from 'react-loader-spinner';

class Signin extends Component {
    state = {
        username: '',
        password: '',
        department: ''
    };


    handleInputChange = e => {
        this.setState({...this.state,
        [e.target.name]: e.target.value})
    };

    signin = e => {
        e.preventDefault();
        const user= this.state.username;
        localStorage.setItem('user', user);
        window.location.reload();
        this.props.history.push('/')
    };

    render() {
        console.log('You are in the Signin page!');
        return (
            <Form onSubmit={this.signin}>
            <h3>Welcome Back!<br/>Please Sign into your Account!</h3>
            <Input
                type='text'
                placeholder='username'
                name='username'
                value={this.state.username}
                onChange={this.handleInputChange}
            />
            <Input 
                type='password'
                placeholder='password'
                name='password'
                value={this.state.password}
                onChange={this.state.handleInputChange}
            />
            <Input 
                type='text'
                placeholder='department'
                name='department'
                value={this.state.department}
                onChange={this.state.handleInputChange}
            /> 
            <Button type='submit'>
                <Loader type="ThreeDots" color="green" height='12' width='37' /> SignIn
            </Button>   
        </Form>
        )
    }
}    

export default Signin;