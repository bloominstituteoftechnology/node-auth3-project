import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    state = {
        username: '',
        password: ''
    }

    signin = e => {
        e.preventDefault();
        console.log(this.state);

        axios
            .post('http://localhost:8000/api/login', this.state)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    render() {
      return (
        <form onSubmit={this.signin}>
            <div>
                <label>Username</label>
                <input 
                    name="username" 
                    value={this.state.username} 
                    onChange={this.handleChange} 
                    type="text" 
                />
            </div>
            <div>
                <label>Password</label>
                <input 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    type="password" 
                />
            </div>
            <div>
                <button type="submit">Signin</button>
            </div>
        </form>
      );
    }
  }

  export default Signin;