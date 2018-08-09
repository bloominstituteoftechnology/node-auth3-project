import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Register extends React.Component {

constructor(){
        super();

        this.state= {
                username:"",
                password:"",
                department:"",
		logged: false,
        };

}

changeHandler = event =>{
        this.setState({[event.target.name]: event.target.value});
};


registerHandler =event =>{

        event.preventDefault();
        const {username, password, department} = this.state;
        const user = {username, password, department};

        axios.post('http://localhost:4003/register', user)

        .then(res =>{

        const token = res.data;
        localStorage.setItem('jwt', token);
        this.setState({username: "", password: "", department: "", logged: true});
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
                <h1>Welcome have successfully created a new account</h1>
                <Link to="/users">View Other Users</Link><br /><br />
                <button onClick={this.logoutHandler}>Logout</button>

                </div>) :(
        <form onSubmit={this.registerHandler}>
        <input type="text" onChange={this.changeHandler} name="username" value={this.state.username}/><br />
	<input type="text" onChange={this.changeHandler} name="department" value={this.state.department}/><br />		
        <input type="password" onChange={this.changeHandler} name="password" value={this.state.password}/><br />		
        <button type="submit">Submit</button>
        </form>
        )}
     </div>
    );
  }

}

export default Register;
