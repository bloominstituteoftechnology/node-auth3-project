import React, { Component } from 'react';
import axios from 'axios'
import { Form } from './';
class Login extends Component {
  state = {
    hasLoggedOn: false
  }
  login = async (creds) => {
    try {

      const login = await axios.post(process.env.REACT_APP_API_URL + '/api/login', creds)
      console.log('login', login)
      window.localStorage.setItem('react_auth_token', login.data.token);
    } catch(err) {
      console.log(err)
    }
  }
  render() { 
    return ( 
      <div className="Login">
        <Form {...{ 
          inputs: { username: '', password: ''},
          onSubmit: this.login,
          formTitle: 'login',
          action: 'login'
        }} />
      </div>
     )
  }
}
 
export default Login;