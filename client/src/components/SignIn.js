import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  state = {
    username: '',
    password: ''
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
          <button onClick={this.onClickHandler}>Log in!</button>
        </div>
      </div>
    );
  }

  onClickHandler = () =>{
    console.log('Click!')
    const body = {
      username:this.state.username,
      password:this.state.password
    }
    console.log(body)
    axios.post('http://localhost:3000/api/login', body)
    .then(data => {
      localStorage.setItem('jwt',data.data)
      this.props.history.push('/users')
    })
    .catch(err => console.log(err))
  }

  onInputChangeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
}

export default SignIn;