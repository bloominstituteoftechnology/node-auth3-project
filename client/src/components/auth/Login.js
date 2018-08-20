import React, { Component } from 'react';
import '../auth/index.css'
import Axios from 'axios';

class Login extends Component {
    
        state = {
            username : '',
            password : '',
        }
    
    render() {
        return (
            <div>
               <form className = 'login-input' onSubmit={this.handleSubmit}>
                        <div className ='input-group'>
                            <label htmlFor="username">username</label>
                            <input 
                            id='username'
                            type="text" 
                            name="username"
                            onChange = {this.handleInputChange }
                            value = {this.state.username}/>
                        </div>
                    
                        <div className ='input-group'>
                            <label htmlFor='password'>password</label>
                            <input 
                            id='password'
                            type="password" 
                            name="password"
                            onChange = { this.handleInputChange } 
                            value = {this.state.password}/>
                        </div>
                    
                    <div>
                        <button type='submit'>submit</button>
                    </div>
               </form>  
            </div>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { username , password } = this.state
        const user = { username , password }
        Axios.post('http://localhost:5000/api/login', user)
            .then(response => {
                const token = response.data
                localStorage.setItem("token", token.token )

                this.props.history.push('/users')
            })
            .catch(err => {
                
            })

    }
    handleInputChange = ( event ) => {
        const { name , value } = event.target
        this.setState({ [name] : value })
    }
}

export default Login;