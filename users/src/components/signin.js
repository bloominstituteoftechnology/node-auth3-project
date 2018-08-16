import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';

class Signin extends Component {
    state={
        username: '',
        password: ''
    }

  render() {
    return (
      <div className="Signin">
      <h1> Sign in</h1>
      <form onSubmit={this.submitHandler}>
          <div>
            <input 
            name="username"
            value={this.state.username} 
            onChange={this.inputChangeHandler}
            type = "text" />
          </div>

          <div>
            <input 
            name="password"
            value={this.state.password} 
            onChange={this.inputChangeHandler}
            type = "password"/>
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
    const {name, value} = event.target
    //console.log('name', 'name', 'value', 'value')

    this.setState({[name]:value })
};

submitHandler = event => {
    event.preventDefault();

    axios
    .post('http://localhost:3400/login', this.state)
    .then(res => {
        const token = res.data;

        localStorage.setItem('jwt', token)
    })
    .catch(err => {
        console.error('Axios failed')
    });

    console.log('state', this.state)
}


}

export default Signin;
