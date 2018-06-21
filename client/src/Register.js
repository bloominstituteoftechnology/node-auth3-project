import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state ={
    username:'',
    password:'',
    race:'',
  };

render() {
  return (
    <form>
      <div>
	<label>Username</label>
	<input
	  value={this.state.username}
	  onChange={this.handleChange}
	  name='username'
	  type='text'/>
      </div>
      <div>
	<label>Password</label>
	<input
	  value={this.state.password}
	  onChange={this.handleChange}
	  name="password"
	  type="password"
	  />
      </div>
      <div>
	<label>Race</label>
	<input
	  value={this.state.race}
	  onChange={this.handleChange}
	  name="race"
	  type="race"
	  />
      </div>
      <div>
	<button onClick={this.handleSubmitRegister}>Register</button>
      </div>
      
    </form>
  );
}


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
};

  handleSubmitRegister = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5500/api/auth/register', this.state)
      .then(response => {
	localStorage.setItem('jwt', response.data.token);
	this.props.history.push('/users');
      })
      .catch(err=> console.log('oops!'));
  };

}


export default Register;
