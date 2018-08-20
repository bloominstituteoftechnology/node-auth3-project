import React, { Component } from 'react';
import '../auth/index.css'
import Axios from 'axios';



class SignUp extends Component {
    state = {
        username : '',
        password : '',
        cpassword : '',
        department : '',
        userCreated : false,
        invalidPassword : false
    }
    render() {
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div className ='input-group'>
                        <label htmlFor="username">username</label>
                        <input 
                        id='username'
                        type="text"
                        name='username'
                        onChange={ this.handleInputChange }
                        value={this.state.username}/>
                    </div>
                    <div className ='input-group'>
                        <label htmlFor="password">password</label>
                        <input 
                        id='password'
                        type="password"
                        name='password'
                        onChange={ this.handleInputChange }
                        value={this.state.password}
                        />
                    </div>
                    <div className ='input-group'>
                        <label htmlFor="cpassword">confirm password</label>
                        <input 
                        id='cpassword'
                        type="password"
                        name='cpassword'
                        onChange={ this.handleInputChange }
                        value={this.state.cpassword}/>
                    </div>
                    <div className ='input-group'>
                        <label htmlFor="department">Department</label>
                        <input 
                        id = 'department'
                        type="text"
                        name='department'
                        onChange={ this.handleInputChange }
                        value={this.state.department}/>
                    </div>
                    <div><button type="submit">Register</button></div>
                </form>
            </div>
        );
    }

    handleSubmit = ( event ) =>{
        event.preventDefault()
        const { username, password, cpassword, department} = this.state

        if(password === cpassword){
            const user = { username, password, department }
            Axios.post('http://localhost:5000/api/register', user )
                .then( response =>{
                    const token = response.data
                    localStorage.setItem('token', token )
                    this.setState({
                        username : '',
                        password : '',
                        cpassword : '',
                        department : ''})
                    this.props.history.push('/users')

                })
                .catch(error => {
                   console.log(error)
                })
                
        }
        else {
           this.setState({ password : '', cpassword : ''})
        }

    }

    handleInputChange = (event) =>{
        
        const { name , value } = event.target
        this.setState({[name] :value})
    }
}

export default SignUp;