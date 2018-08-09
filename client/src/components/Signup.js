import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Signup extends Component {
  state = {
    username: "",
    password: "",
    department: ""
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:8002/api/register`, this.state)
      .then(response => {
        localStorage.setItem('token', response.data);
        this.props.history.push('/signin');
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
         <div className='signin'>
            <h1>Register Form</h1>
            <form onSubmit={this.submitHandler}>
                <div>
                    <input 
                        name='username'
                        value={this.state.username} 
                        type="text" 
                        onChange={this.inputChangeHandler} />
                </div>
                <div>
                    <input 
                        name='password'
                        value={this.state.password} 
                        type="password" 
                        onChange={this.inputChangeHandler} />
                    <input 
                        name='department'
                        value={this.state.department} 
                        type="text" 
                        onChange={this.inputChangeHandler} />
                </div>
                <div>
                    <button type="submit"> SignUp </button>
                </div>
            </form>
        </div>
    );
  }
}

export default Signup;