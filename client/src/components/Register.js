import React, { Component } from 'react';


const initialUser = {
    username: '',
    password: '',
}

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: '',
        }
    }

    submitHandler = () => {}
            
    render() {
        return (
            <section>
        <form onSubmit={this.submitHandler}>
            <label htmlFor='username'>Username</label>
            <input 
              type='text' 
              id='username' 
              name='username' 
              value={this.state.username}
            >
            </input>
            
            <label htmlFor='password'>password</label>
            <input 
              type='text' 
              id='password' 
              name='password' 
              value={this.state.password}
            >
            </input>
            
            </form>
            { this.state.message 

              ? (<h4>{this.state.message}</h4>)
              : undefined
            }
            </section>
            
        );
    }
}
            
        
            
            