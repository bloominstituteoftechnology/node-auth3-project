import React, { Component } from 'react';
import axios from 'axios'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    

    changeHandler = (e) =>{
      this.setState({
          [e.target.name]: e.target.value
      })
    }

    submitHandler = (e) => {
      e.preventDefault();
      const user = {
            'username':this.state.username, 
            'password':this.state.password
        }

      axios
      .post('http://localhost:8000/api/signin', user)
      .then(response =>{
          const token = response.data;
          localStorage.setItem('token', token)
          this.props.history.push('/users')
      })
      .catch(err=>{
          console.log(err)
      })

    }

    render() {
        return (
          <div>
            <h1>Sign In</h1>
            <form onSubmit={this.submitHandler}>
              <input value={this.state.username} name='username' onChange={this.changeHandler} placeholder='username' type="text"/>
              <input value={this.state.password} name='password' onChange={this.changeHandler} placeholder='password' type="password"/>
              <button type='submit'>submit</button>
            </form>
          </div>
        );
    }
}

export default SignIn;
