import React, { Component } from 'react'
import '../index.css';
import '../App.css';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
axios.defaults.withCredentials = true;


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    }
  }

  // handleSubmit = () => {
  //   const URL = 'http://localhost:3000/'
  //   axios
  //     .post(`http://localhost:8000/api/register`, this.state)
  //     //.then(response => console.log(response))
  //     .then(response => window.location.href = URL)
  //     .catch(error => console.log(error));
  // }
  handleSubmit = () => {
    axios
      .post(`http://localhost:8000/api/register`, this.state)
      .then(response => {
        console.log('response', response)
        localStorage.setItem('token', response.data)
        //console.log('localStorage', localStorage.token)
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