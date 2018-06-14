import React, { Component } from 'react';
import axios from 'axios';
import './User.css'

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleLogin = () => {
    axios
      .post('http://localhost:5500/api/auth/login', this.state)
      .then(response => {
        localStorage.setItem('jwt', response.data.token);
          this.props.history.push('/users');
        })
        .catch(err => console.log(err));
    this.setState({username: '', password: ''});
  };

  handleRegister = () => {
    this.setState({username: '', password: ''});
  }

  render() { 
    return (
      <div className="User-container"> 
        <div className="User">
          <div className="User-title">
            User Login
          </div>
          <div className="User-input">
            <input name='username' type="text" onChange={this.handleChange} value={this.state.username} placeholder="Username" />
          </div>
          <div className="User-input">
          <input name='password' type="password" onChange={this.handleChange} value={this.state.password} placeholder="Password"/>
          </div>
          <button className="User-button" onClick={this.handleLogin}>Login</button>
          <div className="User-title">
            Not Register Yet?          
          </div>
          <button className="User-button" onClick={this.handleRegister}>Register</button>
        </div>
      </div>
     )
  }
}
 
export default UserLogin;
