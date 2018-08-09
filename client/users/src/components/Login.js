import React, { Component } from 'react'
import '../index.css';
import '../App.css';
import Header from './Header';
//import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit = () => {
    axios
      .post(`http://localhost:8000/api/login`, this.state)
      .then(response => {
        localStorage.setItem('token', response.data)
        console.log('localStorage', localStorage.token)
        //this.props.history.push('/');
        //console.log('localStorage',localStorage)
      }) 
      .catch(err => localStorage.removeItem('token'));
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogout = id => {
    const URL = 'http://localhost:3000/'
    axios
      .get(`http://localhost:8000/api/logout`)
      //.then(response => window.location.href = URL)
      .then(response => console.log('logout response', response))
      .catch(error => console.log('logout error', error))
  }

  render() {
    return (
      <div className="App">
      <Header />
      <div className="form-group container w-50">
        <h3 className="header mt-2">Login</h3>
        <input
          name='username'
          type='text' 
          className="form-control"
          placeholder="Username"
          onChange={(e) => this.handleChange(e)}
        /><br />
        <input
          name='password' 
          type='password'
          className="form-control"
          placeholder="password"
          onChange={(e) => this.handleChange(e)}
        /><br />
        <button 
          type="submit" 
          className="btn btn-info"
          onClick={() => this.handleSubmit()}
        >
          Login
        </button>
      </div>
      </div>
    )
  }
}