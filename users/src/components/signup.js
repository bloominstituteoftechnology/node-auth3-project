import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
    state={
        username: '',
        password: '',
        department: ''
    }

  render() {
    return (
      <div className="Signup">
      <h1> Sign Up</h1>
      <form onSubmit={this.submitHandler}>
          <div>
              <label htmlFor='username'/>
            <input 
            name="username"
            value={this.state.username} 
            onChange={this.inputChangeHandler}
            type = "text" />
          </div>

          <div>
              <label htmlFor='password'/>
            <input 
            name="password"
            value={this.state.password} 
            onChange={this.inputChangeHandler}
            type = "password"/>
          </div>

          <div>
              <label htmlFor='department'/>
            <input 
            name="department"
            value={this.state.department} 
            onChange={this.inputChangeHandler}
            type = "text"/>
          </div>
          

            <div>
            <button type="submit">
            Sign Up
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
    .post('http://localhost:3400/register', this.state)
    .then(res => {
        const token = res.data;

        localStorage.setItem('jwt', token)
        window.location.reload();
    })
    .catch(err => {
        console.error('Axios failed')
    });

    console.log('state', this.state)
}


}

export default Signup;