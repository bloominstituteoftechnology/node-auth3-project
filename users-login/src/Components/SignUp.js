import React from 'react';

import {Link} from 'react-router-dom';

class SignUp extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
          <div className = 'sign-up-container'>
            <h1>Lambda User Registration</h1>
            <div className ='sign-up-input-container'>
                <div className = 'username-input-container'> 
                    <h3>Username: </h3>
                    <input 
                        className = 'username-input'
                    />
                </div>
                <div className = 'password-input-container'>
                    <h3>Password: </h3>
                    <input 
                        className = 'password-input'
                    />
                </div>
                <div className = 'department-input-container'>
                    <h3>Department: </h3>
                    <input 
                        className = 'department-input'
                    />
                </div>
            </div>
          </div>
        ) 
    }
}

export default SignUp;