import React from 'react';
import '../App.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      department: ''
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSignup = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const department = this.state.department;
    console.log(username, password);
    axios.post('http://localhost:8000/api/register', {username, password, department}).then(response => {
      localStorage.setItem('token', response.data.token);
      this.props.history.push('/');
    }).catch(err => {
      console.log(err);
    })

  }

  render() {
    return (
      <div>
        <form className="login">
        <h1 className="loginTitle">Lambda Notes</h1>
        <h2>Sign Up</h2>
        <div>Username: <input name="username" placeholder="Username"
        onChange={this.handleChange} value={this.state.username} /></div><br/>
        <div>Password: <input type="password" name="password" placeholder="Password"
        onChange={this.handleChange} value={this.state.password} /><br/>
        <div>Department: <input name="department" placeholder="Department"
        onChange={this.handleChange} value={this.state.department} /></div><br/>
        <input className="sidebar-button login-button" type="submit" value="Log In" onClick={this.handleSignup} /></div>
        <NavLink to='/'>"Have an account already? Login here"</NavLink>
        </form>
      </div>
    );
  }
}

export default SignUp;
