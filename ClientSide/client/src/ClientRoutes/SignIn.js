import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';




class SignIn extends Component {
  state = {
      username: '',
      password: '',
  };


  render() {
      console.log(this.props.history);
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
         <Link to="/users"> <button type="Submit">Sign In</button></Link>
      </div>
    </form>   
    );
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({ [name]: value})
  };


  signup = event => {
    event.preventDefault();
    const user = {...this.state};
    axios
     .post('http://localhost:3300/api/login', user)
     .then(res => {
         console.log(res.data);
         localStorage.setItem('jwt', res.data.token);
     })
     .catch(err => {
         console.error("Axios Error:", err);
     });
  };

  
}

export default SignIn;
