import React, { Component }  from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      department: ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  registerUser = event => {
    event.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      alert('Please enter credentials!');
      return;
    }

    const user = { 
      username: this.state.username, 
      password: this.state.password,
      department: this.state.department
    };
    
    axios
      .post('http://localhost:8000/api/register', user)
      .then(response => {
        const token = response.data;
        localStorage.setItem('token', token)
        this.props.history.push('/api/signin')
        alert('Success!');
      })
      .catch(err => {
        console.error('Axios Failed');
      });
  }  

  render() {
    return (
      <div className="register">
        <form className="register-form" onSubmit={event => event.preventDefault()}>
          <h1>Register</h1>
          <input 
            name='username' 
            value={this.state.username} 
            onChange={this.handleChange} 
            placeholder='Username' 
            type='text'
          />
          <input 
            name='password' 
            value={this.state.password} 
            onChange={this.handleChange} 
            placeholder='Password' 
            type='password'
          />
          <input 
            name='department'
            value={this.state.department}
            onChange={this.handleChange}
            placeholder='Department'
            type='text'
          />
          <button onClick={this.registerUser}>Sign Up</button> 
        </form>
      </div>
    )
  }
}

export default Signup;