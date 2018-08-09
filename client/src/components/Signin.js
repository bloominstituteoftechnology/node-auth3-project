import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            password:''
        }
    }

    inputChangeHandler = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log('name ', name, 'value: ', value)
    }
    
    submitHandler = event => {
        event.preventDefault();

        axios
        .post('http://localhost:8002/api/login', this.state)
        .then(res => {
            console.log('data', res.data);
            const token = res.data;
    
            localStorage.setItem('token', token);
            this.props.history.push('/users')
        
        })
        .catch(err => {
            console.error('Axios falied');
        });
        console.log('state', this.state)
    }


  render() {
    return (
        <div className='signin'>
            <h1>SignIn Form</h1>
            <form onSubmit={this.submitHandler}>
                <div>
                    <input 
                        name='username'
                        value={this.state.username} 
                        type="text" 
                        onChange={this.inputChangeHandler} />
                </div>
                <div>
                    <input 
                        name='password'
                        value={this.state.password} 
                        type="password" 
                        onChange={this.inputChangeHandler} />
                </div>
                <div>
                    <button type="submit"> Signin </button>
                </div>
            </form>
        </div>
    );
  }
}


export default Signin;