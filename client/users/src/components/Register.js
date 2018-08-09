import React, { Component } from 'react'
import '../index.css';
import '../App.css';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    }
  }

  handleSubmit = () => {
    const URL = 'http://localhost:3000/'
    axios
      .post(`http://localhost:8000/api/register`, this.state)
      //.then(response => console.log(response))
      .then(response => window.location.href = URL)
      .catch(error => console.log(error));
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogout = () => {
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
        <h3 className="header mt-2">Register</h3>
        <input
          name='user'
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
          Save
        </button>
      </div>
      </div>
    )
  }
}