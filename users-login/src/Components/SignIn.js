import React from 'react'
import {Link} from 'react-router-dom';

class SignIn extends React.Component{
    constructor(){
        super()
        this.state ={
            username: '',
            password: ''
        }
    }

    inputHandler = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = (event) =>{
        event.preventDefault()
        this.props.logInUser(this.state)
        this.setState({
            username: '',
            password: ''
        });
        this.props.history.push('/users')
    }
    render(){
        return(
            <div className = 'home-page-container'>
            <h1 className = 'home-page-header'>Lambda User Login</h1>
            <div className = 'login-input-container'>
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
                <div className = 'button-container'>
                    <Link exact to = '/users' className = 'log-in-button' onClick = {this.submitHandler}>Submit Login</Link>
                    <Link exact to = '/register' className = 'registration-button'>Register</Link>
                </div>
             </div>
        </div>  
        )
    }
}

export default SignIn;