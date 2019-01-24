import React from 'react'
import {Link} from 'react-router-dom';

class SignIn extends React.Component{
    constructor(){
        super()
        this.state ={

        }
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
            
                    />
                </div>
                <div className = 'password-container'>
                     <h3>Password: </h3>
                     <input
                        className = 'password-input'

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