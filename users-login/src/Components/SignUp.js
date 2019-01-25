import React from 'react';

import {Link} from 'react-router-dom';

import '../css/SignUp.css';

class SignUp extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            department: '',
        }
    }

    inputHandler = (event) =>{
        this.setState({[event.target.name] : event.target.value})
    }

    submitHandler = (event) =>{
        event.preventDefault()
        this.props.registerUser(this.state)
        this.setState({
            username: '',
            password: '',
            department: '',
        })
        this.props.history.push('/');
    }

    render(){
        return(
          <div className = 'sign-up-container'>
            <h1>Lambda User Registration</h1>
            <div className ='sign-up-input-container'>
                <div className = 'username-container'> 
                    <h3>Username: </h3>
                    <input 
                        className = 'username-input'
                        type = 'text'
                        placeholder = 'Enter username'
                        value = {this.state.username}
                        name = 'username'
                        onChange = {this.inputHandler}
                    />
                </div>
                <div className = 'password-container'>
                    <h3>Password: </h3>
                    <input 
                        className = 'password-input'
                        type = 'text'
                        placeholder = 'Enter password'
                        value = {this.state.password}
                        name = 'password'
                        onChange = {this.inputHandler}
                    />
                </div>
                <div className = 'department-container'>
                    <h3>Department: </h3>
                    <input 
                        className = 'department-input'
                        type = 'text'
                        placeholder = 'Enter department'
                        value = {this.state.department}
                        name = 'department'
                        onChange = {this.inputHandler}
                    />
                </div>
            </div>
            <div className = 'button-container'>
                <Link exact to = '/' onClick = {this.submitHandler}>
                    <div className = 'registration-button'>Register User</div>
                </Link>
            </div>
          </div>
        ) 
    }
}

export default SignUp;