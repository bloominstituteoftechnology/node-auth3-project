import React from 'react';
import '../App.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      unAuthenticated: false
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleLogin = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    axios.post('http://localhost:8000/api/login', {username, password}).then(response => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('User Department', response.data.userDep);
      window.location.reload();
    }).catch(err => {
      this.setState({unAuthenticated: true});
      console.log(err);
    })

  }

  render() {
    return (
      <div>
        <form className="login">
        <h1 className="loginTitle">Lambda Notes</h1>
        <div>Username: <input name="username" placeholder="Username"
        onChange={this.handleChange} value={this.state.username} /></div><br/>
        <div>Password: <input type="password" name="password" placeholder="Password"
        onChange={this.handleChange} value={this.state.password} /></div><br/>
        <input className="sidebar-button login-button" type="submit" value="Log In" onClick={this.handleLogin} /><br/>
        <NavLink to='/signup' className="Goto-Signup">Need an account? Click here to sign up</NavLink>
        {this.state.unAuthenticated ? <p className="wrong-password">Whoops, wrong username or password, try again</p>: null}
        </form>

      </div>
    );
  }
}

export default Login;
