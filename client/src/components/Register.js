import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {

    state = {
        username: '',
        password: '',
        race: '',
    }


    
      inputChangeHandler = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value });
      };

    submitHandler = event => {
        event.preventDefault();
    
        axios
          .post('http://localhost:5500/api/auth/register', this.state)
          .then(response => {
            localStorage.setItem('jwt', response.data.token);
    
            console.log('register props:', this.props);
            this.props.history.push('/users');
          })
          .catch(err => console.log('bad register panda!'));
      };

    render() {
        return (
            <form onSubmit={this.submitHandler}> 
                <div>
                    <label>Username</label>
                    <input
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    name='username'
                    type='text'
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    name='password'
                    type='password'
                    />
                </div>
                <div>
                    <label>Race</label>
                    <input
                    value={this.state.race}
                    onChange={this.inputChangeHandler}
                    name='race'
                    type='text'
                    />
                </div>
                <div>
                    <button type='submit'>Register</button>
                </div>
            </form>
        );
    }
}

export default Register;