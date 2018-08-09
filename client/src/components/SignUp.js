import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    department: ''
  }
  render() {
    return (
      <div>
        <div>          
          <label htmlFor="">Username</label>
          <input onChange = {this.onInputChangeHandler} name="username" type="text"/>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input onChange = {this.onInputChangeHandler} name="password" type="text"/>
        </div>
        <div>
          <label htmlFor="">Department</label>
          <input onChange = {this.onInputChangeHandler} name="department" type="text"/>
        </div>
        <div>
          <button onClick={this.onClickHandler}>Sign Up!</button>
        </div>
      </div>
    );
  }

  onClickHandler = () =>{
    console.log('Click!')
    const body = {
      username:this.state.username,
      password:this.state.password,
      department:this.state.department
    }
    console.log(body)
    axios.post('http://localhost:3000/api/register', body)
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  onInputChangeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
}

export default SignUp;