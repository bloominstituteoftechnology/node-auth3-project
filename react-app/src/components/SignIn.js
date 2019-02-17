import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userName:'',
            Password:''
        }
    }

    changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler=e=>{
        e.preventDefault();
        this.loginUser();
    }

    loginUser=()=>{
        axios     
		.post(`http://localhost:8000/api/login`,this.state)
           .then(response => {
			console.log('response'+response);
			localStorage.setItem('jwt',response.data.token);
			this.props.history.push('/users');
           })
           .catch(err => {
               console.log(err);
           });
    }
    render(){
        return(
            <form onSubmit={this.submitHandler}>
					<input
						onChange={this.changeHandler}
						type="text"
						name="userName"
						placeholder="userName"
						value={this.state.userName}
					/>
					<input
						onChange={this.changeHandler}
						type="password"
						name="Password"
						placeholder="Password"
						value={this.state.Password}
					/>
					<button>Submit</button>
				</form>
        )
    }
}



export default SignIn;