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
                    <div className = 'log-in-button'>Submit Login</div>
                    <Link exact to = '/register' className = 'registration-button'>Register</Link>
                </div>
             </div>
        </div>  
        )
    }
}

export default SignIn;