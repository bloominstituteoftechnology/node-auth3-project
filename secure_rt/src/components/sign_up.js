import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import Loader from 'react-loader-spinner';

class Signup extends Component {
    state = {
        username: '',
        password: '',
        department: ''
    }   

handleInputChange = e => {
    this.setState({...this.state, 
    [e.target.name]: e.target.value})
};

signup = e => {
    e.preventDefault();
    const user= this.state.username;
    localStorage.setItem('user', user);
    window.location.reload();
    this.props.history.push('/');
};

render() {
    console.log('You are in the Signup page!');
    return (
        <Form onSubmit={this.signup}>
            <h3>Welcome!<br/>Please Sign up for an Account with us!</h3>
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
                <Loader type="ThreeDots" color="green" height='12' width='37' /> SignUp
            </Button>   
        </Form>
    )
}
};

export default Signup;
