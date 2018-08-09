import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class SignIn extends React.Component {
  
constructor(){
	super();
	
	this.state= {
		username:"",
		password:"",
		logged: false,
	};

}        
        
changeHandler = event =>{
	this.setState({[event.target.name]: event.target.value});
};        
        
        
submitHandler =event =>{
	
	event.preventDefault();
	const {username, password} = this.state;
	const user = {username, password};

	axios.post('http://localhost:4003/login', user)
	
	.then(res =>{

	const token = res.data;	
	localStorage.setItem('jwt', token);
	this.setState({logged: true, username: "", password: ""});	
	})

	.catch(err =>{
	console.log("error: couldn't login");
	
	});

};


logoutHandler = event =>{
	localStorage.removeItem('jwt');
	this.setState({logged: false});

};


        
   render() {
    return (
      <div>
	{this.state.logged ? 
		(<div>
		<h1>Welcome You are logged in...</h1>
		<Link to="/users">View Other Users</Link><br /><br />	
		<button onClick={this.logoutHandler}>Logout</button>

		</div>) :(
		<div>
		<h2>Login</h2><br /><br />	
     	<form onSubmit={this.submitHandler}>
	<input type="text" onChange={this.changeHandler} name="username" value={this.state.username}/><br />
	<input type="password" onChange={this.changeHandler} name="password" value={this.state.password}/><br />
	<button type="submit">Submit</button>
	</form>
	</div>		
	)}        
     </div>
    );
  }

}

export default SignIn;
