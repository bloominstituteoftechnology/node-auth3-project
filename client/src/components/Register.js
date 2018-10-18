import React, {Component} from 'react';
import axios from 'axios';
 
class Register extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        username: '',
        password: '',
        department: ''
    }
  }
     
  handleInput = event => {
      event.preventDefault();
      this.setState({
          [event.target.name]: event.target.value
      })
  }
     
  handleRegister = event => {
    event.preventDefault();
    let user = {
        username: this.state.username,
        password: this.state.password,
        department: this.state.department
    };

    let endpoint = `http://localhost:5000/api/register`;
    axios.post(endpoint, user)
    .then(res => {
        localStorage.setItem('jwt', res.data.token);
        this.props.history.replace('/users');
    })
    .catch(err => {
        console.error(err)
    })
  }
        
  render() {
    return (
      <div>
        <h1>Register here:</h1>
        <form onSubmit={this.handleRegister}>
          <input type = 'text' name = 'username' value = {this.state.username} placeholder='username' onChange={this.handleInput}></input>
          
          <input type='text' name = 'department' value = {this.state.department} placeholder = 'department' onChange={this.handleInput}></input>
          
          <input type='password' name = 'password' value = {this.state.password} placeholder = 'password' onChange={this.handleInput}></input>
          <button>Register</button>
        </form>
      </div>
    )
  }
}
 
export default Register; 