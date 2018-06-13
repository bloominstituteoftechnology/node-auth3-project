import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

class loginRegister extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      password:'',
      race:'',
      text:'',
      session: null,
    };
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  signup = () => {
    axios
      .post('http://localhost:5500/api/auth/register', {
	username: this.state.username,
	password: this.state.password,
	withCredentials: true
      })
      .then(res => console.log('yes', res));
  }

  login = () => {
    axios
      .post('http://localhost:5500/api/auth/login', {
	username: this.state.username,
	password: this.state.password,
	withCredentials: true
      })
      .then(res => console.log('yes', res))
      .catch(err => console.log(err));
  }

  refresh = () => {
    axios
      .get('http://localhost:5500')
      .then(res => {
	console.log(res);
	this.setState({ text: res.data.message });
      })
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div>
	<h1>{this.state.text}</h1>
	<h3>Register Here:</h3>  
	<input name='username'
	       value={this.state.username}
	       onChange={this.handleChange}/>
	<input name='password'
	       value={this.state.password}
	       onChange={this.handleChange}/>
     	<input name='race'
	       value={this.state.race}
	       onChange={this.handleChange}/>
	<input type='button'
	       value='Sign Up'
	       onClick={this.signup}/>
	<br /><br />
	<h3>Log In:</h3>
	<input name='username'
	       value={this.state.username}
	       onChange={this.handleChange}/>
	<input name='password'
	       value={this.state.password}
	       onChange={this.handleChange}/>
     	<input name='race'
	       value={this.state.race}
	       onChange={this.handleChange}/>
	<input type='button'
	       value='Log In'
	       onClick={this.login}/>
	<button onClick={this.refresh}>Refresh</button>
      </div>
    );
  };

  export default loginRegister;
