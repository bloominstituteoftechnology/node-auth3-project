import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  state= {
    username: 'thomas',
    password: ''
  }

  render() {
    return (
      <div className="SignIn">
        <h1> Sign In Component </h1>
        
        <form action="" onSubmit={this.submitHandler}>
          <div>
            <input 
            name="username"
            value={this.state.username} 
            onChange={this.inputChangeHandler}
            type="text"
            />
          </div>
          <div>
            <input
            name="password" 
            value={this.state.password}
            onChange={this.inputChangeHandler}
            type="password"
            />
          </div>
          <div>
            <button type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }

  inputChangeHandler = event => {
    // handle the input change > update state
    const { name, value } = event.target;
    // console.log('name', name, 'value', value);
  
    this.setState({ [name]: value });
  }
  
  submitHandler = event => {
    event.preventDefault();
  
    axios.post('http://localhost:3300/login', this.state)
      .then(res => {
        // console.log('data', res.data);
        const token = res.data
        
        // we hold onto it, we save it
        localStorage.setItem('jwt', token);
      })
      .catch(err => {
        console.error('Axios failed')
      })
    console.log('state', this.state);
  }
}


export default SignIn;