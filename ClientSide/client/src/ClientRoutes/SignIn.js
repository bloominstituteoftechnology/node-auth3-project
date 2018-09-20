import React, { Component } from 'react';
import axios from 'axios';




class SignIn extends Component {
  state = {
      username: '',
      password: '',
  };


  render() {
    return (
    <form onSubmit={this.signin}>
      <div>
        <label>Username</label>
        <input name="username" value={this.state.username} onChange={this.handleChange} type='text' />
      </div>
      <div>
          <label>Password</label>
          <input name="password" value={this.state.password} onChange={this.handleChange} type='text' />
      </div>
      <div>
          <button type="Submit">Sign In</button>
      </div>
    </form>   
    );
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({ [name]: value})
  };


  signin = event => {
      event.preventDefault();

      axios
       .post('http://localhost:3300/api/login', this.state)
       .then(res => {
           console.log(res.data);
           localStorage.setItem('jwt', res.data.token);
           this.props.history.push('/users')
       })
       .catch(err => {
           console.error("Axios Error:", err);
       });
    };

  
}

export default SignIn;
