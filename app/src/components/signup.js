import React, { Component } from 'react';
import axios from 'axios'


class Signup extends Component {
  state = {
    username: '',
    password: '',
    department: ''
  }

  handler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register', this.state)
    .then(res => {
      const token = res.data;
      localStorage.setItem('jwt', token);
      this.props.history.push('/users')
    })
    .catch(err => {
      console.log('axios failed', err.message )
    })
  }

  render() {
    return (
      <div className='signin'>
        <h1>Create an Account...</h1>
        <form onSubmit={this.submitHandler}>
          <input
          name= 'username'
          placeholder='username'
          value= {this.state.username}
          onChange= {this.handler}
          type= 'text'
          />
          <br />
          <input
          name= 'password'
          placeholder='password'
          value= {this.state.password}
          onChange= {this.handler}
          type= 'password'
          />
          <br/>
          <input
          name= 'department'
          placeholder='department'
          value= {this.state.department}
          onChange= {this.handler}
          type= 'text'
          />
          <br />
          <button type='submit'>Register</button>
        </form>
      </div>
    );
  }
}

export default Signup;
