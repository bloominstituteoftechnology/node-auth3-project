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
        // console.log
       
        this.setState({ [name]: value });
       
    }
    
    submitHandler = event => {
        event.preventDefault();
        axios
        .post('http://localhost:8002/api/login', this.state)
        .then(res => {
            console.log('data', res.data);
            const token = res.data;
    
            localStorage.setItem('jwt', token)
        })
        .catch(err => {
            console.error('Axios falied');
        });
        console.log('state', this.state)
       }


  render() {
    return (
        <div>
            <h1>Signin Form</h1>
            <form onSubmit={this.submitHandler}>
                <div>
                    <input value={this.state.username} type="text" onChange={this.inputChangeHandler} />
                </div>
                <div>
                    <input value={this.state.password} type="password" onChange={this.inputChangeHandler} />
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