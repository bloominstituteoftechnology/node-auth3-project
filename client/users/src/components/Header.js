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
      token: true
    }
  }
  
  handleLogout = () => {
    const URL = 'http://localhost:3000/';
    localStorage.removeItem('token');
    console.log('localStorage.token', localStorage.token)
    this.setState({
      token: false
    })

    //window.location.href = URL;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Auth-ii</h1> 
          {localStorage.token ? <Link to="/" style={{ textDecoration: 'none' }}>
            <button type='button' className="btn btn-secondary mr-2">Users</button>
          </Link> : null}

          {localStorage.token ? null : <Link to="/register" style={{ textDecoration: 'none' }}>
            <button type='button' className="btn btn-info mr-2">Register</button>
          </Link>}

          {localStorage.token ? null : <Link to="/login" style={{ textDecoration: 'none' }}>
            <button type='button' className="btn btn-success mr-2">Login</button>
          </Link>}

          {localStorage.token ? <button type='button' onClick={() => this.handleLogout()} handleLogout={() => this.handleLogout} className="btn btn-danger mr-2">Logout</button> : null}
        </header>
      </div>
    )
  }
}