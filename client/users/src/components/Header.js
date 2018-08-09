import React, { Component } from 'react'
import '../index.css';
import '../App.css';
import { Link } from 'react-router-dom';


export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    }
  }
  
  handleLogout = () => {
    const URL = 'http://localhost:3000/';
    localStorage.removeItem('token');
    window.location.href = URL
    console.log('removed')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Auth-ii</h1>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button type='button' className="btn btn-secondary mr-2">Users</button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button type='button' className="btn btn-info mr-2">Register</button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button type='button' className="btn btn-success mr-2">Login</button>
          </Link>
          <button type='button' onClick={() => this.handleLogout()} handleLogout={() => this.handleLogout} className="btn btn-danger mr-2">Logout</button>
        </header>
      </div>
    )
  }
}