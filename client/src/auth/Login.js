import React, { Component } from 'react';
import '../App.css';
import {Route} from 'react-router-dom';
import axios from 'axios'

class Login extends Component {
  state = {
      username: 'Adrian',
      password: ''
  }  
  render() {
    return (
      <div className="Login">
            <h1>Login Component</h1>
            <form onSubmit = {this.submitHandler}>
                <div >
                    <input 
                        type = 'text' 
                        name = 'username' 
                        value = {this.state.username} 
                        onChange= {this.inputChangeHandler}
                    />
                </div>
                <div>
                <input 
                        type = 'password' 
                        name = 'password' 
                        value = {this.state.password} 
                        onChange= {this.inputChangeHandler}
                />
                </div>
                <div>
                    <button type = 'submit'>Login</button>
                </div>
            </form>
      </div>
    );
  }

  inputChangeHandler = (e) => {
      e.preventDefault();
      const {name, value} = e.target;
      console.log('name: ', name, 'value: ', value);
      this.setState({[name]: value})
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log('state', this.state)
    
    axios
        .post('http://localhost:9000/api/login', this.state)
        .then(res =>{
            // console.log('data', res.data)
            const token = res.data;
            localStorage.setItem('jwt', token);
        }).catch()
        .catch(err => {
            console.error('Axios failed')
        })
  }
}

export default Login;